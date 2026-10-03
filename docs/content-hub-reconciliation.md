# Reconciliación del Content Hub

Rama: `feature/content-hub-soraya`. El commit `12d95b4` conserva el estado completo de ambas implementaciones antes de unificarlas; no se hizo reset ni se descartó el rediseño.

## Comparación y decisiones

| Archivos                                                                              | Hallazgo                                                             | Implementación final                                                                                                                                      |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/content-hub.ts`, `src/lib/news.ts`                                           | Consultas/formatos y adaptadores con tipos alternos                  | `content-hub.ts`: validación, consultas parametrizadas, aprobación editorial, caché y formato de fechas; incorpora resolución de imágenes del otro módulo |
| `news-cards.tsx`, `news-grid.tsx`                                                     | Tarjetas alternativas                                                | `NewsGrid`: imágenes locales/CMS, alt, enlaces descriptivos y mismo uso en Home y listado                                                                 |
| `content-body.tsx`, detalle de noticia                                                | Renderizadores alternos                                              | `ContentBody`: Portable Text, enlaces seguros e imágenes de Sanity                                                                                        |
| `contentHubSettings.ts`, `newsPage.ts`                                                | Dos documentos para los mismos textos                                | `contentHubSettings`: todas las etiquetas activas; migración offline descrita abajo                                                                       |
| `src/content/news.ts`                                                                 | Alias `NewsPost`/`NewsItem`, `NewsCopy`/`HubCopy`, perfiles alternos | `NewsItem`, `HubCopy` y un único perfil local, sin biografía inventada                                                                                    |
| `post.ts`, `person.ts`, `fields.ts`                                                   | Campos complementarios                                               | Se conservan tipo y categoría, autoría, captions, estados, fechas, SEO, foto/alt y revisión editorial                                                     |
| `noticias/page.tsx`, `noticias/[slug]/page.tsx`                                       | Rutas únicas, imports mezclados                                      | Ambas usan la misma capa de datos; detalles nuevos se resuelven sin rebuild                                                                               |
| `page.tsx`, `layout.tsx`, `nosotros/page.tsx`, `sitemap.ts`                           | Consumidores de ambos módulos                                        | Un único proveedor para Home, navegación, perfil y sitemap                                                                                                |
| `src/content/site.ts`                                                                 | “Noticias” duplicado                                                 | Una sola entrada                                                                                                                                          |
| `globals.css`, `next.config.ts`, `vitest.config.ts`                                   | Estilos y configuración complementarios                              | Conservados; estilos específicos responsivos e imágenes del propio CMS                                                                                    |
| `BRAND_GUIDE.md`, header, footer, logo, service-card, puerto-rico-hero y JPEG locales | Rediseño previo                                                      | Preservado                                                                                                                                                |
| `README.md`, `news.test.ts`                                                           | Documentación y expectativas divergentes de fallback                 | Actualizados al comportamiento solicitado: fallback también cuando no hay publicaciones aprobadas                                                         |

## Migración no destructiva de `newsPage`

El schema duplicado `newsPage` deja de registrarse. Ningún documento remoto se elimina ni se modifica automáticamente. Si ya existe contenido de ese tipo:

1. Conserve un export NDJSON del dataset como respaldo. El script opera únicamente con archivos locales y no recibe tokens.
2. Ejecute `node scripts/migrate-news-page.mjs export.ndjson migrated.ndjson`. La salida debe ser un archivo nuevo; no sobrescribe entradas ni archivos existentes.
3. Revise la salida: crea documentos `contentHubSettings` con IDs nuevos y conserva los campos originales. Copia `allLabel → allNews`, `readLabel → readMore`, `backLabel → back`, `navigationLabel → navLabel`, `profileHeading → profileTitle`; no reemplaza un valor canónico existente. Conserva `empty`, el resto de textos, SEO y aprobación. Mantiene la relación de IDs entre borrador y publicado. Solo omite metadatos gestionados por Sanity (`_rev`, `_createdAt`, `_updatedAt`).
4. Si ya hay un `contentHubSettings`, combine sus valores manualmente en Studio antes de importar; no mantenga dos documentos canónicos aprobados con valores contradictorios. Revise el documento preparado antes de importar a Sanity. Este trabajo no hace esa importación.
5. Verifique el contenido y aprobación del documento canónico en Studio. Los documentos antiguos siguen en el dataset y el respaldo; la aplicación no los consulta. Cualquier retirada posterior requiere revisión separada.

`post.type` es el tipo de publicación; `post.category` permanece disponible como clasificación editorial y admite valores heredados. Para documentos antiguos que guardaban el tipo en `category`, la consulta usa ese valor cuando falta `type`. No se elimina ningún campo de publicación o persona.

## Límites del contenido recibido

No se recibió retrato individual ni biografía verificada. El perfil usa el arte editorial suministrado completo y el nombre de Soraya, sin agregar hechos biográficos. Una persona aprobada con slug `soraya-flores` reemplaza los datos locales. Las tres publicaciones locales son educativas, sin convocatorias o fechas inventadas.

## Validación final

- `npm run lint`: sin errores ni advertencias.
- `npm run typecheck`: correcto.
- `npm test`: 14 tests en 3 archivos, todos correctos.
- `npm run build`: correcto; genera el listado y los tres detalles locales, Home, perfil y sitemap. Turbopack se ejecutó fuera del sandbox tras quedar sin avanzar dentro del entorno restringido.
- Servidor de producción local: Home, listado, tres detalles, Nosotros, sitemap e imagen responden 200; slug inexistente responde 404. Home/listado muestran tres tarjetas y una sola entrada de Noticias en la navegación principal; el botón de menú tiene nombre accesible.
- No se desplegó ni se modificó contenido remoto. No se verificó un dataset real conectado; las consultas se probaron con mocks y el sitio de producción con fallbacks locales.
