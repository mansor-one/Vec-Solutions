# Arquitectura

Next.js App Router sirve páginas mediante Server Components; sólo el formulario y Sanity Studio son Client Components. `src/content/site.ts` ofrece contenido fallback tipado. `sanity/schemaTypes` define el modelo editorial y `sanity/lib/client.ts` evita crear un cliente si falta configuración.

El formulario publica `FormData` a `/api/contacto`, valida en servidor con Zod, descarta el honeypot y envía mediante Resend sólo cuando existen las variables. No persiste datos en la aplicación.

Las páginas especiales `sitemap.ts` y `robots.ts`, Metadata API y JSON-LD cubren la base SEO. Los tokens CSS viven en `globals.css`; los colores de Sanity están modelados para una futura conexión editorial controlada.
