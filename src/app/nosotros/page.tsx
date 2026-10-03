import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conozca el enfoque de consultoría de VEC Solutions LLC.",
  alternates: { canonical: "/nosotros" },
};
import { getSoraya, getNewsCopy, imageUrl } from "@/lib/news";
import Image from "next/image";
export const revalidate = 300;
export default async function AboutPage() {
  const [person, copy] = await Promise.all([getSoraya(), getNewsCopy()]);
  const photo = imageUrl(person.photo) || person.localImage;
  return (
    <>
      <PageHero
        eyebrow="Sobre VEC Solutions"
        title="El progreso comienza con una visión compartida."
      >
        <p>
          Acompañamos a organizaciones que quieren responder a necesidades
          reales con estrategia, estructura y una ejecución responsable.
        </p>
      </PageHero>
      <section className="section">
        <div className="shell split">
          <div>
            <p className="eyebrow">Nuestro enfoque</p>
            <h2>Escuchar primero. Diseñar con intención.</h2>
            <p>
              Trabajamos de manera cercana para comprender el contexto,
              reconocer capacidades existentes y convertir hallazgos en acciones
              que puedan sostenerse.
            </p>
            <p>
              El contenido histórico, de misión y de visión está preparado en el
              CMS para revisión editorial antes de publicarse como declaración
              corporativa definitiva.
            </p>
          </div>
          <div className="feature-panel">
            <h3>Así trabajamos</h3>
            <ul>
              <li>Comprensión profunda del contexto</li>
              <li>Análisis basado en evidencia</li>
              <li>Diseño colaborativo de soluciones</li>
              <li>Implementación con seguimiento</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Principios</p>
            <div>
              <h2>Una práctica guiada por el impacto</h2>
            </div>
          </div>
          <div className="values">
            <article className="value">
              <h3>Claridad</h3>
              <p>
                Traducimos complejidad en decisiones y próximos pasos
                comprensibles.
              </p>
            </article>
            <article className="value">
              <h3>Colaboración</h3>
              <p>
                Las soluciones se construyen junto a quienes conocen y viven la
                realidad.
              </p>
            </article>
            <article className="value">
              <h3>Sostenibilidad</h3>
              <p>
                Diseñamos pensando en la capacidad, continuidad y valor a largo
                plazo.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell profile-section">
          <div>
            <p className="eyebrow">{copy.profileHeading}</p>
            <h2>{person.name}</h2>
            {person.role && <p>{person.role}</p>}
            {person.bio && <p className="profile-bio">{person.bio}</p>}
          </div>
          {photo && (
            <Image
              src={photo}
              alt={person.photo?.alt || person.imageAlt || person.name}
              width={600}
              height={600}
              className="content-image"
            />
          )}
        </div>
      </section>
      <section className="cta">
        <div className="shell cta-inner">
          <h2>Conversemos sobre su organización.</h2>
          <Link className="button" href="/contacto">
            Contactar
          </Link>
        </div>
      </section>
    </>
  );
}
