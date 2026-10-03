# VEC Solutions LLC

Primera versión del sitio oficial de VEC Solutions LLC para `vec-solutions.net`.

## Desarrollo

Requiere Node.js 22 o superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Sin variables de Sanity, el sitio usa contenido fallback local y `/studio` muestra instrucciones de conexión. Para calidad: `npm run check` y `npm run build`.

## Entorno

Todas las variables están documentadas en `.env.example`. Los tokens y claves sólo se configuran en el entorno local o Vercel; nunca se versionan. `RESEND_API_KEY` y `CONTACT_EMAIL` activan el formulario. Antes de producción, verifique un dominio remitente en Resend y sustituya `onboarding@resend.dev` en el Route Handler.

## Despliegue

Importe este repositorio en Vercel, configure las variables y use `main` como rama de producción. Configure CORS en Sanity para los dominios de producción, preview y desarrollo.

## Content Hub: noticias y perfil

`/noticias` y `/noticias/[slug]` consultan publicaciones aprobadas en Sanity y se actualizan cada cinco minutos. Sin configuración o si Sanity no responde, se muestran tres publicaciones locales de orientación general; la primera reproduce los puntos del arte suministrado. Si todavía no hay publicaciones aprobadas en Sanity, también se usa el respaldo local. No se incluyen convocatorias ficticias, fechas de publicación inventadas ni biografía sin aprobar.

En Studio, complete `Publicación`, genere su ruta y desactive **Pendiente de revisión editorial** antes de publicar. Una fecha futura oculta el artículo hasta la fecha de publicación. Los campos adicionales cubren tipo, categoría, convocatoria, fuente oficial, verificación, contenido destacado y flujo social. Los artículos se ordenan por fecha; la portada muestra los tres más recientes. Las oportunidades vencidas se muestran cerradas al actualizar la página.

Edite los textos, etiquetas y nombre de navegación de la sección en **Textos del Content Hub**, y apruebe el documento. Cree una **Persona** con identificador `soraya-flores` para reemplazar el perfil local con nombre, cargo, biografía y retrato verificados. Hasta recibir una biografía aprobada, el perfil local usa únicamente su nombre y el arte editorial adjunto completo; no se ha extraído ni generado un retrato nuevo.

Los JPEG recibidos están en `public/content/propuestas-errores.jpeg` y `public/brand/vec-solutions-grants-logo.jpeg`. El logo nuevo se conserva como recurso local para revisión de marca; el encabezado mantiene el logo del rediseño existente. Las imágenes subidas a Sanity se sirven mediante el optimizador de Next.js desde el CDN del propio CMS.

Sanity guarda captions aprobados, estado social y fecha programada; **Metricool realiza la publicación social por separado**. No configure secretos de Meta, Instagram, Facebook ni Metricool aquí ni en el CMS. No se añaden variables de entorno.

Esta implementación conserva todos los campos del CMS; usa los esquemas `contentHubSettings` y `person` y amplía `post`. El schema duplicado `newsPage` se unificó mediante una [migración documentada y no destructiva](docs/content-hub-reconciliation.md). Los documentos existentes deben revisarse y aprobarse explícitamente para aparecer en la sección. No se recibió el paquete de parche ni `styles-additions.css`; los estilos equivalentes se escribieron sobre la arquitectura y paleta actuales.
