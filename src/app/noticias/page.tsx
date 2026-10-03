import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { NewsGrid } from "@/components/news-grid";
import { getNews, getNewsCopy } from "@/lib/news";
export const revalidate = 300;
export async function generateMetadata(): Promise<Metadata> {
  const copy = await getNewsCopy();
  return {
    title: copy.title,
    description: copy.introduction,
    alternates: { canonical: "/noticias" },
  };
}
export default async function NewsPage() {
  const [items, copy] = await Promise.all([getNews(), getNewsCopy()]);
  return (
    <>
      <PageHero eyebrow={copy.navLabel} title={copy.title}>
        <p>{copy.introduction}</p>
      </PageHero>
      <section className="section">
        <div className="shell">
          <NewsGrid posts={items} copy={copy} />
        </div>
      </section>
    </>
  );
}
