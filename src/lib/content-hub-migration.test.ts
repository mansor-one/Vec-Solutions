import { describe, expect, it } from "vitest";
// The migration is an offline Node module; Vitest handles its ESM source.
import { migrateNewsPage } from "../../scripts/migrate-news-page.mjs";

describe("non-destructive newsPage migration", () => {
  it("copies legacy labels and review state without changing the original", () => {
    const source = {
      _id: "legacy",
      _type: "newsPage",
      _rev: "revision",
      readLabel: "Leer",
      navLabel: "Actualidad",
      navigationLabel: "Noticias",
      editorialReviewPending: true,
      empty: "Sin publicaciones",
      customField: "Retener",
    };
    const result = migrateNewsPage(source);
    expect(result).toMatchObject({
      _id: "contentHubSettings.migrated.legacy",
      _type: "contentHubSettings",
      readMore: "Leer",
      navLabel: "Actualidad",
      editorialReviewPending: true,
      empty: "Sin publicaciones",
      customField: "Retener",
      readLabel: "Leer",
    });
    expect(result).not.toHaveProperty("_rev");
    expect(source).toHaveProperty("_type", "newsPage");
    expect(source).toHaveProperty("_rev", "revision");
  });
  it("keeps draft and published IDs paired and ignores other document types", () => {
    const published = migrateNewsPage({ _id: "legacy", _type: "newsPage" });
    const draft = migrateNewsPage({ _id: "drafts.legacy", _type: "newsPage" });
    expect(draft._id).toBe(`drafts.${published._id}`);
    expect(migrateNewsPage({ _id: "post", _type: "post" })).toBeNull();
  });
});
