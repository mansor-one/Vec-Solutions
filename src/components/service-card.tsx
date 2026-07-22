import Link from "next/link";
import type { Service } from "@/content/site";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="10" />
            <path d="M16 6v20M6 16h20M9 9l14 14M23 9 9 23" />
          </svg>
        </span>
        <span className="card-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3>{service.name}</h3>
      <p>{service.summary}</p>
      <Link href={`/servicios/${service.slug}`}>
        Conocer el servicio{" "}
        <span className="link-arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </article>
  );
}
