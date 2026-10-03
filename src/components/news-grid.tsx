import Image from "next/image";
import Link from "next/link";
import type { NewsCopy, NewsPost } from "@/content/news";
import { displayDate, imageUrl } from "@/lib/news";
export function NewsGrid({
  posts,
  copy,
}: {
  posts: NewsPost[];
  copy: NewsCopy;
}) {
  if (!posts.length) return <p>{copy.empty}</p>;
  return (
    <div className="news-grid">
      {posts.map((post) => {
        const src = post.imageUrl || imageUrl(post.image);
        return (
          <article className="news-card" key={post.slug}>
            {src && (
              <Image
                src={src}
                alt={post.imageAlt || post.image?.alt || ""}
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
                aria-label={`${copy.readLabel}: ${post.title}`}
              >
                {copy.readLabel} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
