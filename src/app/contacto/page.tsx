import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Converse con VEC Solutions LLC sobre su organización o proyecto.",
  alternates: { canonical: "/contacto" },
};
export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contacto" title="Comencemos con una conversación.">
        <p>
          Cuéntenos sobre la necesidad, el proyecto o la oportunidad que tiene
          frente a usted.
        </p>
      </PageHero>
      <section className="section">
        <div className="shell contact-grid">
          <aside>
            <p className="eyebrow">Información</p>
            <ul className="contact-list">
              <li>
                <strong>Teléfono</strong>
                <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
              </li>
              <li>
                <strong>Correo</strong>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <strong>Dirección</strong>
                {contact.address.join(", ")}
              </li>
              <li>
                <strong>Horario</strong>
                {contact.hours}
              </li>
            </ul>
          </aside>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
