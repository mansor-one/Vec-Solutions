import Image from "next/image";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { imageUrl, safeUrl } from "@/lib/news";
export function ContentBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <PortableText
      value={body}
      components={{
        marks: {
          link: ({ value, children }) => {
            const href = safeUrl(value?.href);
            return href ? (
              <a href={href} rel="noopener noreferrer">
                {children}
              </a>
            ) : (
              <>{children}</>
            );
          },
        },
        types: {
          image: ({ value }) => {
            const src = imageUrl(value);
            return src ? (
              <Image
                src={src}
                alt={value.alt || ""}
                width={1000}
                height={750}
                className="content-image"
              />
            ) : null;
          },
        },
      }}
    />
  );
}
