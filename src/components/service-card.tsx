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
      <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
      <h3>{service.name}</h3>
      <p>{service.summary}</p>
      <Link href={`/servicios/${service.slug}`}>
        Conocer el servicio <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
