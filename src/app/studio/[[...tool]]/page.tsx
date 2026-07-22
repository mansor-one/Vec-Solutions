import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";
export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
    return (
      <section className="page-hero">
        <div className="shell narrow">
          <p className="eyebrow">Sanity Studio</p>
          <h1>CMS listo para conectar.</h1>
          <p className="lead">
            Configure NEXT_PUBLIC_SANITY_PROJECT_ID para activar el estudio. El
            sitio público funciona con contenido local mientras tanto.
          </p>
        </div>
      </section>
    );
  return <NextStudio config={config} />;
}
