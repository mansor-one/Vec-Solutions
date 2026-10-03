import Image from "next/image";
import Link from "next/link";
import type { HubCopy, NewsItem } from "@/content/news";
import { displayDate } from "@/lib/content-hub";
export function NewsGrid({
  posts,
  copy,
}: {
  posts: NewsItem[];
  copy: HubCopy;
}) {
  if (!posts.length) return <p>{copy.empty}</p>;
  return (
    <div className="news-grid">
      {posts.map((post) => {
        const src = post.imageUrl;
        return (
          <article className="news-card" key={post.slug}>
            {src && (
              <Image
                src={src}
                alt={post.imageAlt || ""}
                width={1254}
                height={1254}
                className="news-image"
              />
            )}
            <div className="news-card-content">
              <p className="news-category">
                {copy[`${post.category || "news"}Label`]}
              </p>
              <h3>
                <Link href={`/noticias/${encodeURIComponent(post.slug)}`}>
                  {post.title}
                </Link>
              </h3>
              {displayDate(post.publishedAt) && (
                <time dateTime={post.publishedAt}>
                  {displayDate(post.publishedAt)}
                </time>
              )}
              {post.excerpt && <p>{post.excerpt}</p>}
              <Link
                className="text-link"
                href={`/noticias/${encodeURIComponent(post.slug)}`}
                aria-label={`${copy.readMore}: ${post.title}`}
              >
                {copy.readMore} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
