import { defineField, defineType } from "sanity";
import { seoFields } from "./fields";
export const person = defineType({
  name: "person",
  title: "Persona",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Identificador",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", title: "Rol verificado", type: "string" }),
    defineField({
      name: "bio",
      title: "Biografía verificada",
      type: "text",
      description: "No añadir credenciales ni afirmaciones sin verificación.",
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (r) => r.required(),
        },
      ],
    }),
    ...seoFields,
  ],
});
