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
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Ruta",
      description: "Identificador para la URL.",
      type: "slug",
      options: { source: "title" },
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
    portableBody,
    ...seoFields,
  ],
});
