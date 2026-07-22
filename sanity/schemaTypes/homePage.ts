import { defineField, defineType } from "sanity";
import { seoFields, portableBody } from "./fields";
export const homePage = defineType({
  name: "homePage",
  title: "Página de inicio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título interno",
      description: "Nombre para identificar esta página en Studio.",
      type: "string",
    }),
    defineField({
      name: "eyebrow",
      title: "Antetítulo",
      description: "Texto breve sobre el título principal.",
      type: "string",
    }),
    defineField({
      name: "headline",
      title: "Título principal",
      description: "Mensaje principal de la portada.",
      type: "string",
    }),
    defineField({
      name: "introduction",
      title: "Introducción",
      description: "Texto introductorio de la portada.",
      type: "text",
    }),
    defineField({
      name: "featuredServices",
      title: "Servicios destacados",
      description: "Servicios mostrados en la portada.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    portableBody,
    ...seoFields,
  ],
});
