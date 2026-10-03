import { defineField, defineType } from "sanity";
import { seoFields } from "./fields";
export const newsPage = defineType({
  name: "newsPage",
  title: "Sección de noticias",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Noticias y oportunidades",
      type: "string",
      initialValue: "Noticias y oportunidades",
    }),
    defineField({
      name: "introduction",
      title:
        "Noticias, oportunidades de financiamiento y perspectivas para organizaciones en Puerto Rico.",
      type: "text",
      initialValue:
        "Noticias, oportunidades de financiamiento y perspectivas para organizaciones en Puerto Rico.",
    }),
    defineField({
      name: "empty",
      title: "Próximamente compartiremos nuevas publicaciones.",
      type: "text",
      initialValue: "Próximamente compartiremos nuevas publicaciones.",
    }),
    defineField({
      name: "allLabel",
      title: "Ver todas las noticias",
      type: "string",
      initialValue: "Ver todas las noticias",
    }),
    defineField({
      name: "readLabel",
      title: "Leer publicación",
      type: "string",
      initialValue: "Leer publicación",
    }),
    defineField({
      name: "backLabel",
      title: "Volver a noticias",
      type: "string",
      initialValue: "Volver a noticias",
    }),
    defineField({
      name: "profileHeading",
      title: "Conozca a Soraya Flores",
      type: "string",
      initialValue: "Conozca a Soraya Flores",
    }),
    defineField({
      name: "sourceLabel",
      title: "Fuente oficial",
      type: "string",
      initialValue: "Fuente oficial",
    }),
    defineField({
      name: "verifiedLabel",
      title: "Última verificación",
      type: "string",
      initialValue: "Última verificación",
    }),
    defineField({
      name: "deadlineLabel",
      title: "Fecha límite",
      type: "string",
      initialValue: "Fecha límite",
    }),
    defineField({
      name: "amountLabel",
      title: "Monto",
      type: "string",
      initialValue: "Monto",
    }),
    defineField({
      name: "eligibilityLabel",
      title: "Elegibilidad",
      type: "string",
      initialValue: "Elegibilidad",
    }),
    defineField({
      name: "statusLabel",
      title: "Estado",
      type: "string",
      initialValue: "Estado",
    }),
    defineField({
      name: "newsLabel",
      title: "Noticia",
      type: "string",
      initialValue: "Noticia",
    }),
    defineField({
      name: "fundingLabel",
      title: "Oportunidad",
      type: "string",
      initialValue: "Oportunidad",
    }),
    defineField({
      name: "insightLabel",
      title: "Perspectiva",
      type: "string",
      initialValue: "Perspectiva",
    }),
    defineField({
      name: "openLabel",
      title: "Abierta",
      type: "string",
      initialValue: "Abierta",
    }),
    defineField({
      name: "closedLabel",
      title: "Cerrada",
      type: "string",
      initialValue: "Cerrada",
    }),
    defineField({
      name: "upcomingLabel",
      title: "Próximamente",
      type: "string",
      initialValue: "Próximamente",
    }),
    defineField({
      name: "navigationLabel",
      title: "Noticias",
      type: "string",
      initialValue: "Noticias",
    }),
    ...seoFields,
  ],
});
