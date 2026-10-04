# Guía para Soraya

Sanity Studio estará en `/studio` después de configurar el proyecto. Cada campo incluye instrucciones en español. Mantenga activado “Pendiente de revisión editorial” hasta confirmar el contenido. Use “Borrador” para servicios incompletos y publique sólo contenido aprobado.

Al cargar imágenes, confirme derechos de uso, use una resolución amplia y escriba texto alternativo que describa su propósito. Nunca introduzca claves, tokens ni información confidencial en el CMS. Antes de cambiar teléfonos, correo, dirección, horario o redes, verifique el dato y actualice la fecha de revisión.

## Flujo editorial: Sanity → Web → Metricool

Sanity es la fuente maestra del contenido y Metricool es el motor de publicación social. Publicar en Sanity o cambiar un estado no programa ni publica automáticamente en redes.

1. Crear y publicar el contenido en Sanity.
2. Revisar que la aprobación editorial esté confirmada: `editorialReviewPending` debe estar en `false`. La web conserva sus reglas actuales de publicación y fecha.
3. Completar los captions de Instagram y Facebook en `instagramCaption` y `facebookCaption`.
4. Marcar las redes deseadas mediante `publishToInstagram` y `publishToFacebook`. Ambos campos comienzan en `true` para publicaciones nuevas; revisar la selección antes de aprobar. No se modifican automáticamente documentos existentes.
5. Cambiar `socialStatus` a `approved`.
6. ChatGPT/Metricool programa la publicación en las redes seleccionadas usando el contenido y captions aprobados de Sanity. Este paso se realiza por separado; el sitio no incorpora automatización ni conexión nueva.
7. Tras confirmar la programación, guardar en Sanity `scheduledAt`, `metricoolUuid` y `metricoolPlannerUrl` con los datos reales devueltos por Metricool. Los dos últimos campos son de solo lectura en Studio: deben escribirse mediante una operación autorizada por API, sin cambiar esa protección. Esta implementación no realiza esa escritura.
8. Cambiar `socialStatus` a `scheduled` después de guardar la programación confirmada.
9. Tras confirmar la publicación en Metricool, cambiar `socialStatus` a `published`.

No almacenar claves de Meta ni Metricool, tokens o credenciales en Sanity. Los campos nuevos contienen únicamente preferencias de red y referencias de programación. No se elimina ningún campo ni se añaden variables de entorno.
