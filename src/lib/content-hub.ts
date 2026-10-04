import { cache } from "react";
import { z } from "zod";
import { dataset, projectId } from "../../sanity/env";
import { client } from "../../sanity/lib/client";
import {
  fallbackNews,
  fallbackPerson,
  hubCopy,
  type HubCopy,
  type NewsItem,
} from "@/content/news";

export const publicPostFilter = `_type == "post" && !(_id in path("drafts.**")) && editorialReviewPending == false && defined(slug.current) && defined(title) && (!defined(publishedAt) || dateTime(publishedAt) <= dateTime(now()))`;
const projection = `{title, "slug": slug.current, excerpt, "category": coalesce(type, select(category in ["news", "funding", "insight"] => category), "news"), publishedAt, body, "imageUrl": image.asset->url, "imageAlt": image.alt, fundingStatus, deadline, amount, eligibility, officialSource, sourceUrl, verifiedAt, featured, seoTitle, seoDescription}`;
const newsSchema = z
  .object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    excerpt: z.string().nullish(),
    category: z.enum(["news", "funding", "insight"]),
  })
  .passthrough();
export function safeUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return;
  try {
    const url = new URL(value);
    if (["https:", "http:"].includes(url.protocol)) return url.href;
  } catch {}
}
function sanityImageUrl(value: unknown) {
  const url = safeUrl(value);
  return url &&
    new URL(url).protocol === "https:" &&
    new URL(url).hostname === "cdn.sanity.io" &&
    new URL(url).pathname.startsWith(`/images/${projectId}/${dataset}/`)
    ? url
    : undefined;
}
export function normalizeNews(value: unknown): NewsItem | undefined {
  const result = newsSchema.safeParse(value);
  if (!result.success) return;
  const data = result.data;
  const item: NewsItem = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || "",
    category: data.category,
  };
  for (const key of [
    "publishedAt",
    "deadline",
    "verifiedAt",
    "amount",
    "eligibility",
    "officialSource",
    "imageAlt",
    "seoTitle",
    "seoDescription",
  ] as const) {
    if (typeof data[key] === "string") item[key] = data[key];
  }
  item.sourceUrl = safeUrl(data.sourceUrl);
  item.imageUrl = sanityImageUrl(data.imageUrl);
  if (Array.isArray(data.body)) item.body = data.body as NewsItem["body"];
  if (["open", "closed", "upcoming"].includes(String(data.fundingStatus)))
    item.fundingStatus = data.fundingStatus as NewsItem["fundingStatus"];
  item.featured = data.featured === true;
  return item;
}
const getAllNews = cache(async (): Promise<NewsItem[]> => {
  if (!client) return fallbackNews;
  try {
    const data: unknown[] = await client.fetch(
      `*[${publicPostFilter}] | order(publishedAt desc, _createdAt desc) ${projection}`,
      {},
      { next: { revalidate: 300 }, timeout: 5000 },
    );
    const items = data
      .map(normalizeNews)
      .filter((item): item is NewsItem => Boolean(item));
    return data.length === 0 ? fallbackNews : items;
  } catch {
    return fallbackNews;
  }
});
export async function getNews(limit?: number) {
  const items = await getAllNews();
  return limit === undefined ? items : items.slice(0, Math.max(0, limit));
}
export async function getNewsBySlug(slug: string) {
  if (!client) return fallbackNews.find((item) => item.slug === slug) ?? null;
  try {
    const value = await client.fetch(
      `*[${publicPostFilter} && slug.current == $slug][0] ${projection}`,
      { slug },
      { next: { revalidate: 300 }, timeout: 5000 },
    );
    return (
      normalizeNews(value) ??
      (await getAllNews()).find((item) => item.slug === slug) ??
      null
    );
  } catch {
    return (await getAllNews()).find((item) => item.slug === slug) ?? null;
  }
}
export const getHubCopy = cache(async (): Promise<HubCopy> => {
  if (!client) return hubCopy;
  try {
    const settings = await client.fetch(
      `*[_type == "contentHubSettings" && !(_id in path("drafts.**")) && editorialReviewPending == false] | order(_updatedAt desc)[0]`,
      {},
      { next: { revalidate: 300 }, timeout: 5000 },
    );
    const copy = { ...hubCopy };
    for (const key of Object.keys(copy) as (keyof HubCopy)[])
      if (typeof settings?.[key] === "string" && settings[key].trim())
        copy[key] = settings[key];
    return copy;
  } catch {
    return hubCopy;
  }
});
export const getSorayaProfile = cache(async () => {
  if (!client) return fallbackPerson;
  try {
    const profile = await client.fetch(
      `*[_type == "person" && slug.current == "soraya-flores" && editorialReviewPending == false && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]{name, role, bio, "photoUrl": photo.asset->url, "photoAlt": photo.alt}`,
      {},
      { next: { revalidate: 300 }, timeout: 5000 },
    );
    if (!profile) return fallbackPerson;
    return {
      name: profile.name || fallbackPerson.name,
      role: profile.role || "",
      bio: profile.bio || "",
      photoUrl: sanityImageUrl(profile.photoUrl) || fallbackPerson.photoUrl,
      photoAlt: profile.photoAlt || fallbackPerson.photoAlt,
    };
  } catch {
    return fallbackPerson;
  }
});
export function displayDate(value?: string) {
  if (!value) return;
  const date = new Date(value.length === 10 ? `${value}T12:00:00Z` : value);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("es-PR", {
    dateStyle: "long",
    ...(value.length > 10 ? { timeStyle: "short" as const } : {}),
    timeZone: "America/Puerto_Rico",
  }).format(date);
}
export function fundingStatus(item: NewsItem, now = Date.now()) {
  if (item.deadline && new Date(item.deadline).getTime() <= now)
    return "closed";
  return item.fundingStatus;
}

export function imageUrl(image?: { asset?: { _ref?: string } }) {
  const match = image?.asset?._ref?.match(
    /^image-([a-zA-Z0-9]+)-(\d+x\d+)-(jpg|jpeg|png|webp|gif)$/,
  );
  return match
    ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${match[1]}-${match[2]}.${match[3]}`
    : undefined;
}
