import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentBody } from "@/components/content-body";
import { PageHero } from "@/components/page-hero";
import {
  getNews,
  getNewsBySlug,
  getHubCopy,
  displayDate,
  fundingStatus,
} from "@/lib/content-hub";
export const revalidate = 300;
export const dynamicParams = true;
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getNews()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getNewsBySlug((await params).slug);
  if (!item) return { title: "Publicación no encontrada" };
  return {
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.excerpt,
    alternates: { canonical: `/noticias/${item.slug}` },
    openGraph: {
      type: "article",
      title: item.title,
      description: item.excerpt,
      ...(item.publishedAt ? { publishedTime: item.publishedAt } : {}),
    },
  };
}
export default async function NewsDetail({ params }: Props) {
  const item = await getNewsBySlug((await params).slug);
  if (!item) notFound();
  const copy = await getHubCopy();
  const status = fundingStatus(item);
  const facts = [
    [copy.statusLabel, status ? copy[`${status}Label`] : undefined],
    [
      copy.deadlineLabel,
      item.deadline ? displayDate(item.deadline) : undefined,
    ],
    [copy.amountLabel, item.amount],
    [copy.eligibilityLabel, item.eligibility],
    [
      copy.verifiedLabel,
      item.verifiedAt ? displayDate(item.verifiedAt) : undefined,
    ],
  ].filter(([, value]) => value);
  return (
    <>
      <PageHero eyebrow={copy[`${item.category}Label`]} title={item.title}>
        <p>{item.excerpt}</p>
      </PageHero>
      <section className="section">
        <article className="shell news-detail">
          <Link className="text-link" href="/noticias">
            ← {copy.back}
          </Link>
          {item.publishedAt && displayDate(item.publishedAt) && (
            <p>
              <time dateTime={item.publishedAt}>
                {displayDate(item.publishedAt)}
              </time>
            </p>
          )}
          {item.imageUrl && item.imageAlt && (
            <Image
              className="news-image"
              src={item.imageUrl}
              alt={item.imageAlt}
              width={1254}
              height={1254}
            />
          )}
          <div className="news-body">
            {item.body?.length ? (
              <ContentBody body={item.body} />
            ) : (
              item.paragraphs?.map((text) => <p key={text}>{text}</p>)
            )}
          </div>
          {facts.length > 0 && (
            <dl className="news-facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {item.sourceUrl && (
            <p>
              <a
                className="text-link"
                href={item.sourceUrl}
                rel="noopener noreferrer"
              >
                {copy.sourceLabel}
                {item.officialSource ? `: ${item.officialSource}` : ""} ↗
              </a>
            </p>
          )}
          <p>
            <Link className="button" href="/contacto">
              {copy.contactLabel}
            </Link>
          </p>
        </article>
      </section>
    </>
  );
}
