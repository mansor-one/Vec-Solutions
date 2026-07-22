import { defineField, defineType } from "sanity";
import { seoFields } from "./fields";
export const service = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      description: "Nombre público del servicio.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Ruta",
      description: "Identificador para la URL.",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Descripción corta",
      description: "Resumen para tarjetas y listados.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fullDescription",
      title: "Descripción completa",
      description: "Explicación detallada del servicio.",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "problem",
      title: "Problema que atiende",
      description: "Necesidad principal que resuelve.",
      type: "text",
    }),
    ...(["deliverables", "benefits", "process"] as const).map((name) =>
      defineField({
        name,
        title:
          name === "deliverables"
            ? "Entregables"
            : name === "benefits"
              ? "Beneficios"
              : "Proceso",
        description: `Lista de ${name === "deliverables" ? "resultados entregables" : name === "benefits" ? "beneficios" : "pasos del proceso"}.`,
        type: "array",
        of: [{ type: "string" }],
      }),
    ),
    defineField({
      name: "image",
      title: "Imagen",
      description: "Imagen representativa, con texto alternativo.",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "icon",
      title: "Ícono",
      description: "Nombre o recurso gráfico aprobado.",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Orden",
      description: "Posición en los listados.",
      type: "number",
    }),
    defineField({
      name: "featured",
      title: "Destacado",
      description: "Mostrar con prioridad en Inicio.",
      type: "boolean",
    }),
    defineField({
      name: "status",
      title: "Estado",
      description: "Controla si está en borrador, activo o archivado.",
      type: "string",
      options: {
        list: [
          { title: "Borrador", value: "draft" },
          { title: "Activo", value: "active" },
          { title: "Archivado", value: "archived" },
        ],
      },
      initialValue: "draft",
    }),
    ...seoFields,
  ],
});
