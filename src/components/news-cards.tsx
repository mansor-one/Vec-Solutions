import Link from "next/link";
import { type HubCopy, type NewsItem } from "@/content/news";
import { displayDate } from "@/lib/content-hub";
export function NewsCards({
  items,
  copy,
}: {
  items: NewsItem[];
  copy: HubCopy;
}) {
  return (
    <div className="news-grid">
      {items.map((item) => (
        <article className="news-card" key={item.slug}>
          <p className="eyebrow">{copy[`${item.category}Label`]}</p>
          {item.publishedAt && displayDate(item.publishedAt) && (
            <time dateTime={item.publishedAt}>
              {displayDate(item.publishedAt)}
            </time>
          )}
          <h3>
            <Link href={`/noticias/${item.slug}`}>{item.title}</Link>
          </h3>
          <p>{item.excerpt}</p>
          <Link
            className="text-link"
            href={`/noticias/${item.slug}`}
            aria-label={`${copy.readMore}: ${item.title}`}
          >
            {copy.readMore} <span aria-hidden="true">→</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
