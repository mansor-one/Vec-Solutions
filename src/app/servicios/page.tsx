import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios de consultoría, planificación, propuestas y desarrollo económico.",
  alternates: { canonical: "/servicios" },
};
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Estrategia conectada con la ejecución."
      >
        <p>
          Servicios flexibles para diagnosticar retos, diseñar soluciones,
          movilizar recursos y sostener resultados.
        </p>
      </PageHero>
      <section className="section">
        <div className="shell">
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
