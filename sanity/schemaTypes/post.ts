import { defineField, defineType } from "sanity";
import { seoFields, portableBody } from "./fields";
export const post = defineType({
  name: "post",
  title: "Publicación",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      description: "Título público de la publicación.",
      validation: (r) => r.required(),
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Ruta",
      description: "Identificador para la URL.",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extracto",
      description: "Resumen para listados.",
      type: "text",
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      description: "Fecha visible para lectores.",
      type: "datetime",
    }),
    defineField({
      name: "image",
      title: "Imagen principal",
      description: "Imagen con derechos de uso verificados.",
      type: "image",
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "type",
      title: "Tipo",
      type: "string",
      initialValue: "news",
      options: {
        list: [
          { title: "Noticia", value: "news" },
          { title: "Oportunidad", value: "funding" },
          { title: "Perspectiva", value: "insight" },
        ],
      },
    }),
    defineField({ name: "category", title: "Categoría", type: "string" }),
    defineField({
      name: "fundingStatus",
      title: "Estado de convocatoria",
      type: "string",
      options: { list: ["open", "closed", "upcoming"] },
    }),
    defineField({ name: "deadline", title: "Fecha límite", type: "datetime" }),
    defineField({
      name: "amount",
      title: "Monto y moneda según convocatoria",
      type: "string",
    }),
    defineField({ name: "eligibility", title: "Elegibilidad", type: "text" }),
    defineField({
      name: "officialSource",
      title: "Fuente oficial",
      type: "string",
    }),
    defineField({
      name: "sourceUrl",
      title: "Enlace oficial",
      type: "url",
      validation: (r) => r.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "verifiedAt",
      title: "Fecha de verificación",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Destacada",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "instagramCaption",
      title: "Texto aprobado para Instagram",
      type: "text",
    }),
    defineField({
      name: "facebookCaption",
      title: "Texto aprobado para Facebook",
      type: "text",
    }),
    defineField({
      name: "socialStatus",
      title: "Estado social (gestión en Metricool)",
      type: "string",
      initialValue: "draft",
      options: {
        list: ["draft", "review", "approved", "scheduled", "published"],
      },
    }),
    defineField({
      name: "scheduledAt",
      title: "Fecha programada en Metricool",
      type: "datetime",
    }),
    defineField({
      name: "author",
      title: "Autoría",
      type: "reference",
      to: [{ type: "person" }],
    }),
    portableBody,
    ...seoFields,
  ],
});
