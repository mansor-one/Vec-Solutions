import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">
              Consultoría · Desarrollo económico · Puerto Rico
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
                Hablemos de su proyecto
              </Link>
              <Link className="button button-secondary" href="/servicios">
                Explorar servicios
              </Link>
            </div>
          </div>
          <aside className="hero-note">
            <strong>De la estrategia a la acción</strong>
            <p>
              Acompañamiento cercano, análisis riguroso y soluciones diseñadas
              para su realidad.
            </p>
          </aside>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Cómo podemos ayudar</p>
            <div>
              <h2>Capacidad para cada etapa del camino</h2>
              <p>
                Desde entender el reto hasta sostener la ejecución, integramos
                estrategia, operación y evaluación.
              </p>
            </div>
          </div>
          <div className="services-grid">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="shell split">
          <div>
            <p className="eyebrow">Una colaboración con propósito</p>
            <h2>Claridad para decidir. Estructura para avanzar.</h2>
            <p>
              Partimos de la realidad de cada organización. Escuchamos,
              analizamos y construimos una ruta práctica que su equipo pueda
              adoptar y sostener.
            </p>
            <Link className="button" href="/nosotros">
              Conozca nuestro enfoque
            </Link>
          </div>
          <div className="feature-panel">
            <ul>
              <li>Diagnóstico centrado en sus necesidades</li>
              <li>Recomendaciones claras y accionables</li>
              <li>Procesos participativos y responsables</li>
              <li>Seguimiento orientado a resultados</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="cta">
        <div className="shell cta-inner">
          <div>
            <p className="eyebrow">Su próximo paso</p>
            <h2>Construyamos una ruta que funcione.</h2>
          </div>
          <Link className="button" href="/contacto">
            Solicitar una conversación
          </Link>
        </div>
      </section>
    </>
  );
}
