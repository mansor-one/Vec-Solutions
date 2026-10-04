import type { MetadataRoute } from "next";
import { services } from "@/content/site";
import { getNews } from "@/lib/content-hub";
export const revalidate = 300;
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://vec-solutions.net";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [
    "",
    "/nosotros",
    "/noticias",
    ...(await getNews()).map(
      (post) => `/noticias/${encodeURIComponent(post.slug)}`,
    ),
    "/servicios",
    "/contacto",
    "/politica-de-privacidad",
    ...services.map((s) => `/servicios/${s.slug}`),
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/servicios") ? 0.8 : 0.7,
  }));
}
