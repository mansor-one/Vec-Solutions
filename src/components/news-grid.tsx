import Image from "next/image";
import Link from "next/link";
import type { HubCopy, NewsItem } from "@/content/news";
import { displayDate } from "@/lib/content-hub";
export function NewsGrid({
  posts,
  copy,
  editorial = false,
}: {
  posts: NewsItem[];
  copy: HubCopy;
  editorial?: boolean;
}) {
  if (!posts.length) return <p>{copy.empty}</p>;
  const lead = posts.find((post) => post.featured) ?? posts[0];
  const orderedPosts = editorial
    ? [lead, ...posts.filter((post) => post !== lead)]
    : posts;
  return (
    <div className={editorial ? "news-grid news-grid-editorial" : "news-grid"}>
      {orderedPosts.map((post, index) => {
        const src = post.imageUrl;
        return (
          <article
            className={
              editorial && index === 0 ? "news-card news-lead" : "news-card"
            }
            key={post.slug}
          >
            {src && (
              <Image
                src={src}
                alt={post.imageAlt || ""}
                width={1254}
                height={1254}
                className="news-image"
                sizes={
                  editorial
                    ? "(max-width: 760px) 100vw, 60vw"
                    : "(max-width: 620px) 100vw, 33vw"
                }
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
