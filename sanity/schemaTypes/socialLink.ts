import { defineField, defineType } from "sanity";
export const socialLink = defineType({
  name: "socialLink",
  title: "Red social",
  type: "document",
  fields: [
    defineField({
      name: "platform",
      title: "Plataforma",
      description: "Nombre de la red social.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      description: "Enlace público verificado del perfil.",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      title: "Etiqueta accesible",
      description: "Descripción para lectores de pantalla.",
      type: "string",
    }),
    defineField({
      name: "verifiedAt",
      title: "Fecha de verificación",
      description: "Fecha en que se comprobó la URL.",
      type: "date",
    }),
    defineField({
      name: "approved",
      title: "Aprobada",
      description: "Publicar sólo después de revisión.",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
