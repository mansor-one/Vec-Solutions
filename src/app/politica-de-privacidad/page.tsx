import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Borrador de la política de privacidad de VEC Solutions LLC.",
  alternates: { canonical: "/politica-de-privacidad" },
};
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Documento legal" title="Política de privacidad">
        <p>
          Borrador preparado para revisión antes de la publicación definitiva.
        </p>
      </PageHero>
      <article className="shell narrow legal">
        <p className="review-notice">
          <strong>Pendiente de revisión legal y editorial.</strong> Este texto
          informativo no constituye asesoría legal definitiva. Vigencia
          propuesta: 21 de julio de 2026.
        </p>
        <h2>Datos que recopilamos</h2>
        <p>
          El formulario puede recopilar nombre, organización, correo
          electrónico, teléfono, servicio de interés, mensaje y consentimiento.
          También pueden generarse datos técnicos mínimos necesarios para operar
          y proteger el sitio.
        </p>
        <h2>Finalidad</h2>
        <p>
          Usamos la información para responder solicitudes, coordinar servicios,
          mantener registros operacionales y proteger el formulario contra
          abuso. No vendemos datos personales.
        </p>
        <h2>Proveedores técnicos</h2>
        <p>
          El sitio puede utilizar Vercel para alojamiento, Sanity para
          administrar contenido y Resend para entregar correos. Cada proveedor
          procesa información según sus propios términos y medidas de seguridad.
        </p>
        <h2>Conservación y seguridad</h2>
        <p>
          Conservaremos la información sólo durante el tiempo razonablemente
          necesario para atender la solicitud, cumplir obligaciones y resolver
          disputas. Aplicamos medidas técnicas y organizativas razonables,
          aunque ningún sistema puede garantizar seguridad absoluta.
        </p>
        <h2>Cookies y analítica</h2>
        <p>
          La versión inicial no requiere cookies publicitarias. Si se habilita
          analítica, se documentará aquí y se implementarán los avisos o
          consentimientos que correspondan.
        </p>
        <h2>Sus opciones</h2>
        <p>
          Puede solicitar acceso, corrección o eliminación de la información
          enviada, sujeto a obligaciones aplicables.
        </p>
        <h2>Contacto</h2>
        <p>
          Para preguntas sobre privacidad, escriba a{" "}
          <a href="mailto:consultingservicessf@gmail.com">
            consultingservicessf@gmail.com
          </a>{" "}
          o llame al <a href="tel:+17875122613">787-512-2613</a>.
        </p>
      </article>
    </>
  );
}
