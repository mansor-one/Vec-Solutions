import { defineField, defineType } from "sanity";
import { seoFields, portableBody } from "./fields";
export const contactPage = defineType({
  name: "contactPage",
  title: "Página Contacto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      description: "Título visible de la página.",
      type: "string",
    }),
    defineField({
      name: "introduction",
      title: "Introducción",
      description: "Invitación previa al formulario.",
      type: "text",
    }),
    defineField({
      name: "successMessage",
      title: "Mensaje de éxito",
      description: "Confirmación accesible después del envío.",
      type: "string",
    }),
    portableBody,
    ...seoFields,
  ],
});
