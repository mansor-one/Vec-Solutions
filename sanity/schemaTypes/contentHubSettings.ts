import { defineField, defineType } from "sanity";
import { seoFields } from "./fields";
import { hubCopy } from "../../src/content/news";
export const contentHubSettings = defineType({
  name: "contentHubSettings",
  title: "Textos del Content Hub",
  type: "document",
  fields: [
    ...Object.entries(hubCopy).map(([name, value]) =>
      defineField({ name, title: value, type: "string", initialValue: value }),
    ),
    ...seoFields,
  ],
});
