import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";
import "./editorial.css";
import { getHubCopy } from "@/lib/content-hub";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vec-solutions.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VEC Solutions LLC | Consultoría y desarrollo económico",
    template: "%s | VEC Solutions LLC",
  },
  description:
    "Consultoría en desarrollo organizacional, planificación, propuestas y proyectos sostenibles en Puerto Rico.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PR",
    siteName: "VEC Solutions LLC",
    title: "VEC Solutions LLC",
    description: "Estrategia clara. Ejecución sostenible. Impacto medible.",
    url: siteUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const copy = await getHubCopy();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "VEC Solutions LLC",
    url: siteUrl,
    telephone: "+1-787-512-2613",
    email: "consultingservicessf@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Urb. Sierra Real",
      addressLocality: "Cayey",
      addressRegion: "PR",
      postalCode: "00736",
      addressCountry: "US",
    },
  };
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header newsLabel={copy.navLabel} />
        <main id="contenido">{children}</main>
        <Footer newsLabel={copy.navLabel} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
