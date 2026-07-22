import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { services } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/servicios/${slug}` },
  };
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <>
      <PageHero eyebrow="Servicio" title={service.name}>
        <p>{service.summary}</p>
      </PageHero>
      <section className="section">
        <div className="shell split">
          <div>
            <p className="eyebrow">El reto</p>
            <h2>Lo que atendemos</h2>
            <p>{service.problem}</p>
            <p>{service.description}</p>
          </div>
          <div className="detail-block">
            <h2>Entregables típicos</h2>
            <ul className="detail-list">
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="shell detail-grid">
          <div>
            <p className="eyebrow">Beneficios</p>
            <h2>Resultados que fortalecen su capacidad</h2>
            <ul className="detail-list">
              {service.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Proceso</p>
            <h2>Una ruta clara</h2>
            <ol className="process">
              {service.process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="cta">
        <div className="shell cta-inner">
          <h2>Exploremos este reto juntos.</h2>
          <Link className="button" href={`/contacto?servicio=${service.slug}`}>
            Consultar sobre este servicio
          </Link>
        </div>
      </section>
    </>
  );
}
