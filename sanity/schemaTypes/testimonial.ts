import { defineField, defineType } from "sanity";
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonio",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Testimonio",
      description: "Cita aprobada por la persona.",
      type: "text",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Autoría",
      description: "Nombre de la persona autorizada.",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Cargo y organización",
      description: "Contexto público de la autoría.",
      type: "string",
    }),
    defineField({
      name: "consentConfirmed",
      title: "Consentimiento confirmado",
      description: "Confirma autorización para publicación.",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
