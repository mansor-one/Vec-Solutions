import type { PortableTextBlock } from "next-sanity";
export type NewsItem = {
  type?: "news" | "funding" | "insight";
  image?: { asset?: { _ref?: string }; alt?: string };
  title: string;
  slug: string;
  excerpt: string;
  category: "news" | "funding" | "insight";
  publishedAt?: string;
  body?: PortableTextBlock[];
  paragraphs?: string[];
  imageUrl?: string;
  imageAlt?: string;
  fundingStatus?: "open" | "closed" | "upcoming";
  deadline?: string;
  amount?: string;
  eligibility?: string;
  officialSource?: string;
  sourceUrl?: string;
  verifiedAt?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};
export const fallbackNews: NewsItem[] = [
  {
    title: "3 errores que te pueden dejar fuera",
    slug: "tres-errores-al-someter-una-propuesta",
    category: "insight",
    excerpt:
      "Antes de someter una propuesta, verifica elegibilidad, documentos requeridos y fechas límite.",
    imageUrl: "/content/propuestas-errores.jpeg",
    imageAlt:
      "Soraya junto a los tres puntos clave para revisar una propuesta: elegibilidad, documentos requeridos y fechas límite.",
    paragraphs: [
      "Confirma que tu organización cumple con los criterios de elegibilidad de la convocatoria.",
      "Revisa la lista de documentos requeridos antes de preparar la solicitud.",
      "Verifica la fecha límite y organiza el tiempo necesario para completar la propuesta.",
    ],
  },
  {
    title: "Organiza los documentos de tu propuesta",
    slug: "organiza-documentos-propuesta",
    category: "insight",
    excerpt:
      "Una lista de requisitos ayuda a preparar y revisar la documentación.",
    paragraphs: [
      "Parte de los requisitos de la convocatoria y crea una lista de los documentos solicitados.",
      "Asigna responsables para reunir cada documento y revisar que esté completo antes de someterlo.",
    ],
  },
  {
    title: "Planifica antes de someter",
    slug: "planifica-antes-de-someter",
    category: "insight",
    excerpt:
      "Reserva tiempo para verificar los requisitos y revisar la propuesta.",
    paragraphs: [
      "Identifica la fecha límite y los pasos necesarios para completar la solicitud.",
      "Reserva tiempo para revisar elegibilidad, documentos y coherencia de la propuesta antes de someter.",
    ],
  },
];
export const hubCopy = {
  empty: "Próximamente compartiremos nuevas publicaciones.",
  title: "Noticias y oportunidades",
  introduction:
    "Ideas y recursos para preparar propuestas y avanzar con claridad.",
  allNews: "Ver todas las publicaciones",
  readMore: "Leer publicación",
  back: "Volver a noticias",
  newsLabel: "Noticia",
  fundingLabel: "Oportunidad",
  insightLabel: "Insight",
  sourceLabel: "Fuente oficial",
  verifiedLabel: "Verificado el",
  deadlineLabel: "Fecha límite",
  amountLabel: "Monto",
  eligibilityLabel: "Elegibilidad",
  statusLabel: "Estado",
  openLabel: "Abierta",
  closedLabel: "Cerrada",
  upcomingLabel: "Por anunciar",
  contactLabel: "Conversemos sobre su propuesta",
  profileTitle: "Soraya Flores",
  navLabel: "Noticias",
};
export type HubCopy = typeof hubCopy;
export const fallbackPerson = {
  name: "Soraya Flores",
  role: "",
  bio: "",
  photoUrl: "/content/propuestas-errores.jpeg",
  photoAlt:
    "Pieza de VEC Solutions con la imagen de Soraya y consejos para preparar propuestas.",
};

// Compatibility labels for the shared site navigation and profile section.
export const newsCopy = {
  ...hubCopy,
  navigationLabel: hubCopy.navLabel,
  allLabel: hubCopy.allNews,
  readLabel: hubCopy.readMore,
  backLabel: hubCopy.back,
  profileHeading: hubCopy.profileTitle,
  empty: "Próximamente compartiremos nuevas publicaciones.",
};
export type NewsCopy = typeof newsCopy;
export type NewsPost = NewsItem;
export type Person = {
  name: string;
  role?: string;
  bio?: string;
  localImage?: string;
  imageAlt?: string;
  photo?: { asset?: { _ref?: string }; alt?: string };
};
