import { beforeEach, describe, expect, it, vi } from "vitest";
const cms = vi.hoisted(() => ({ fetch: vi.fn() }));
vi.mock("../../sanity/lib/client", () => ({ client: cms }));
import { fallbackNews, hubCopy } from "@/content/news";
import {
  getNews,
  getNewsBySlug,
  getHubCopy,
  getSorayaProfile,
  fundingStatus,
  safeUrl,
  displayDate,
  publicPostFilter,
  normalizeNews,
} from "./content-hub";
beforeEach(() => {
  cms.fetch.mockReset();
});
describe("public Content Hub", () => {
  it("renders supplied local content if Sanity is unavailable", async () => {
    cms.fetch.mockRejectedValue(new Error("offline"));
    expect(await getNews(3)).toEqual(fallbackNews);
    expect(await getNewsBySlug(fallbackNews[0].slug)).toEqual(fallbackNews[0]);
    expect(await getNewsBySlug("missing")).toBeNull();
    expect(await getHubCopy()).toEqual(hubCopy);
    expect((await getSorayaProfile()).bio).toBe("");
  });
  it("uses local articles when Sanity has no approved publications", async () => {
    cms.fetch.mockResolvedValue([]);
    expect(await getNews()).toEqual(fallbackNews);
  });
  it("resolves fallback detail pages when the CMS is empty", async () => {
    cms.fetch.mockImplementation((query: string) =>
      Promise.resolve(query.includes("slug.current == $slug") ? null : []),
    );
    expect(await getNewsBySlug(fallbackNews[0].slug)).toEqual(fallbackNews[0]);
    expect(await getNewsBySlug("missing")).toBeNull();
  });
  it("does not mix fallback details into a populated CMS", async () => {
    cms.fetch.mockImplementation((query: string) =>
      Promise.resolve(
        query.includes("slug.current == $slug")
          ? null
          : [{ ...fallbackNews[0], slug: "cms-post" }],
      ),
    );
    expect(await getNewsBySlug(fallbackNews[0].slug)).toBeNull();
  });
  it("rejects malformed CMS records and never exposes arbitrary image hosts", () => {
    expect(
      normalizeNews({ title: "Invalid", slug: "../private", category: "news" }),
    ).toBeUndefined();
    const post = normalizeNews({
      ...fallbackNews[0],
      imageUrl: "https://example.org/photo.jpg",
      sourceUrl: "javascript:alert(1)",
      instagramCaption: "private workflow",
    });
    expect(post?.imageUrl).toBeUndefined();
    expect(post?.sourceUrl).toBeUndefined();
    expect(post).not.toHaveProperty("instagramCaption");
  });
  it("uses only the approved profile and falls back without fabricating a bio", async () => {
    cms.fetch.mockResolvedValue({
      name: "Soraya Flores",
      bio: "Biografía aprobada",
      photoUrl: "https://example.org/photo.jpg",
    });
    const person = await getSorayaProfile();
    expect(person.bio).toBe("Biografía aprobada");
    expect(person.photoUrl).toBe("/content/propuestas-errores.jpeg");
    expect(cms.fetch.mock.calls[0][0]).toContain(
      "editorialReviewPending == false",
    );
  });
  it("limits results and queries only approved content without exposing social captions", async () => {
    cms.fetch.mockResolvedValue([
      fallbackNews[0],
      { ...fallbackNews[0], slug: "second" },
    ]);
    expect(await getNews(1)).toHaveLength(1);
    const query = cms.fetch.mock.calls[0][0];
    expect(query).toContain(publicPostFilter);
    expect(query).toContain("dateTime(publishedAt) <= dateTime(now())");
    expect(query).not.toContain("instagramCaption");
    expect(query).not.toContain("facebookCaption");
  });
  it("uses parameterized slug lookup for new CMS articles", async () => {
    cms.fetch.mockResolvedValue({ ...fallbackNews[0], slug: "new-post" });
    expect((await getNewsBySlug("new-post"))?.slug).toBe("new-post");
    expect(cms.fetch.mock.calls[0][1]).toEqual({ slug: "new-post" });
  });
  it("merges empty editorial fields with fallback labels", async () => {
    cms.fetch.mockResolvedValue({ title: "Actualidad", empty: null });
    const copy = await getHubCopy();
    expect(copy.title).toBe("Actualidad");
    expect(copy.empty).toBe(hubCopy.empty);
  });
  it("closes expired funding and rejects unsafe source links", () => {
    expect(
      fundingStatus(
        {
          ...fallbackNews[0],
          fundingStatus: "open",
          deadline: "2020-01-01T00:00:00Z",
        },
        Date.parse("2026-10-02"),
      ),
    ).toBe("closed");
    expect(safeUrl("javascript:alert(1)")).toBeUndefined();
    expect(safeUrl("https://example.org/opportunity")).toBe(
      "https://example.org/opportunity",
    );
    expect(displayDate("bad-date")).toBeUndefined();
    expect(displayDate("2026-10-02")).toContain("2 de octubre");
  });
});
