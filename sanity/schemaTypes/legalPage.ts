import { defineField, defineType } from "sanity";
import { seoFields, portableBody } from "./fields";
export const legalPage = defineType({
  name: "legalPage",
  title: "Página legal",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      description: "Nombre del documento legal.",
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
      name: "effectiveDate",
      title: "Fecha de vigencia",
      description: "Fecha aprobada de entrada en vigor.",
      type: "date",
    }),
    defineField({
      name: "legalReviewPending",
      title: "Pendiente de revisión legal",
      description: "Debe permanecer activo hasta aprobación profesional.",
      type: "boolean",
      initialValue: true,
    }),
    portableBody,
    ...seoFields,
  ],
});
