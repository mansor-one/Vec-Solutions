import { defineField, defineType } from "sanity";
import { seoFields, portableBody } from "./fields";
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Caso de estudio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      description: "Nombre público del caso.",
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
      name: "summary",
      title: "Resumen",
      description: "Síntesis sin información confidencial.",
      type: "text",
    }),
    defineField({
      name: "services",
      title: "Servicios relacionados",
      description: "Servicios aplicados al caso.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    portableBody,
    ...seoFields,
  ],
});
