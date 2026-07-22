import { defineField, defineType } from "sanity";
import { seoFields, portableBody } from "./fields";
export const aboutPage = defineType({
  name: "aboutPage",
  title: "Página Nosotros",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      description: "Título visible de la página.",
      type: "string",
    }),
    defineField({
      name: "mission",
      title: "Misión",
      description: "Texto heredado pendiente de aprobación editorial.",
      type: "text",
    }),
    defineField({
      name: "vision",
      title: "Visión",
      description: "Texto heredado pendiente de aprobación editorial.",
      type: "text",
    }),
    defineField({
      name: "history",
      title: "Historia",
      description: "Historia corporativa pendiente de aprobación editorial.",
      type: "array",
      of: [{ type: "block" }],
    }),
    portableBody,
    ...seoFields,
  ],
});
