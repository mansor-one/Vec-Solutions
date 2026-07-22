import { defineField } from "sanity";
export const seoFields = [
  defineField({
    name: "seoTitle",
    title: "Título SEO",
    description: "Título para buscadores; idealmente no más de 60 caracteres.",
    type: "string",
    validation: (r) => r.max(60),
  }),
  defineField({
    name: "seoDescription",
    title: "Descripción SEO",
    description:
      "Resumen para resultados de búsqueda; idealmente no más de 160 caracteres.",
    type: "text",
    rows: 3,
    validation: (r) => r.max(160),
  }),
  defineField({
    name: "editorialReviewPending",
    title: "Pendiente de revisión editorial",
    description:
      "Actívelo mientras el contenido requiera validación corporativa.",
    type: "boolean",
    initialValue: true,
  }),
];
export const portableBody = defineField({
  name: "body",
  title: "Contenido",
  description: "Contenido principal editable de la página.",
  type: "array",
  of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
});
