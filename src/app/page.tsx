import Link from "next/link";
import { PuertoRicoHero } from "@/components/puerto-rico-hero";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/content/site";

import { getNews, getNewsCopy } from "@/lib/news";
import { NewsGrid } from "@/components/news-grid";
export const revalidate = 300;
export default async function Home() {
  const [news, copy] = await Promise.all([getNews(3), getNewsCopy()]);
  return (
    <>
      <section className="hero home-hero">
        <div className="shell hero-grid">
          <div className="hero-content">
            <p className="eyebrow">
              Estrategia · Desarrollo económico · Puerto Rico
            </p>
            <h1>
              Ideas que avanzan. <em>Impacto que perdura.</em>
            </h1>
            <p className="hero-copy">
              Ayudamos a organizaciones y empresas a convertir necesidades
              complejas en estrategias claras, operaciones sostenibles y
              resultados medibles.
            </p>
            <div className="actions">
              <Link className="button" href="/contacto">
                Hablemos de su proyecto <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button button-secondary" href="/servicios">
                Explorar servicios
              </Link>
            </div>
            <div className="hero-trust">
              <span aria-hidden="true">PR</span>
              <p>
                Consultoría cercana, rigurosa y diseñada para nuestra realidad.
              </p>
            </div>
          </div>
          <PuertoRicoHero />
        </div>
        <div className="hero-curve" aria-hidden="true" />
      </section>
      <section className="section services-section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Nuestros servicios</p>
            <div>
              <h2>Capacidad para cada etapa del camino</h2>
              <p>
                Desde entender el reto hasta sostener la ejecución, integramos
                estrategia, operación y evaluación.
              </p>
            </div>
          </div>
          <div className="services-grid home-services">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
          <div className="section-action">
            <Link href="/servicios">
              Ver todos los servicios <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section why-section">
        <div className="shell why-grid">
          <div className="why-intro">
            <p className="eyebrow">Por qué VEC</p>
            <h2>Claridad para decidir. Estructura para avanzar.</h2>
            <p>
              Partimos de la realidad de cada organización. Escuchamos,
              analizamos y construimos una ruta práctica que su equipo pueda
              adoptar y sostener.
            </p>
            <Link className="text-link" href="/nosotros">
              Conozca nuestro enfoque <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="why-list">
            <article>
              <span>01</span>
              <div>
                <h3>Diagnóstico con perspectiva local</h3>
                <p>Comprendemos el contexto antes de recomendar una ruta.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Estrategia que se puede ejecutar</h3>
                <p>
                  Conectamos prioridades, responsables, recursos y seguimiento.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Acompañamiento humano</h3>
                <p>
                  Trabajamos junto a su equipo para fortalecer capacidad
                  interna.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="impact-section">
        <div className="shell impact-grid">
          <div>
            <p className="eyebrow">Impacto con propósito</p>
            <h2>Resultados que se construyen y se sostienen.</h2>
            <p>
              El impacto no se presume: se define, se acompaña y se documenta
              junto a cada organización.
            </p>
          </div>
          <div className="impact-principles">
            <div>
              <strong>Relevancia</strong>
              <span>Soluciones alineadas a necesidades reales.</span>
            </div>
            <div>
              <strong>Capacidad</strong>
              <span>Equipos preparados para continuar avanzando.</span>
            </div>
            <div>
              <strong>Continuidad</strong>
              <span>Procesos diseñados para sostener el progreso.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section industries-section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Sectores que acompañamos</p>
            <div>
              <h2>
                Experiencia aplicable a organizaciones que mueven a Puerto Rico.
              </h2>
              <p>
                Nuestras capacidades se adaptan al contexto, la misión y la
                etapa de cada organización.
              </p>
            </div>
          </div>
          <div className="industries-grid">
            <article>
              <span aria-hidden="true">⌂</span>
              <h3>Gobierno y municipios</h3>
            </article>
            <article>
              <span aria-hidden="true">✦</span>
              <h3>Organizaciones sin fines de lucro</h3>
            </article>
            <article>
              <span aria-hidden="true">▥</span>
              <h3>Pequeñas y medianas empresas</h3>
            </article>
            <article>
              <span aria-hidden="true">◇</span>
              <h3>Desarrollo comunitario</h3>
            </article>
            <article>
              <span aria-hidden="true">◎</span>
              <h3>Iniciativas de impacto</h3>
            </article>
          </div>
        </div>
      </section>
      <section className="section news-section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">{copy.navigationLabel}</p>
            <div>
              <h2>{copy.title}</h2>
              <p>{copy.introduction}</p>
            </div>
          </div>
          <NewsGrid posts={news} copy={copy} />
          <div className="section-action">
            <Link href="/noticias">
              {copy.allLabel} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="cta premium-cta">
        <div className="shell cta-inner">
          <div>
            <p className="eyebrow">Su próximo paso</p>
            <h2>Construyamos una ruta que funcione.</h2>
            <p>Cuéntenos qué necesita mover hacia adelante.</p>
          </div>
          <Link className="button" href="/contacto">
            Solicitar una conversación <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
