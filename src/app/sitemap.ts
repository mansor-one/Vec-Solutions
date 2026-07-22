import type { MetadataRoute } from "next";
import { services } from "@/content/site";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://vec-solutions.net";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/nosotros",
    "/servicios",
    "/contacto",
    "/politica-de-privacidad",
    ...services.map((s) => `/servicios/${s.slug}`),
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/servicios") ? 0.8 : 0.7,
  }));
}
