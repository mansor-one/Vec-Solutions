import { beforeEach, describe, expect, it, vi } from "vitest";
const cms = vi.hoisted(() => ({ fetch: vi.fn() }));
vi.mock("../../sanity/lib/client", () => ({ client: cms }));
import { fallbackNews, newsCopy } from "@/content/news";
import {
  getNews,
  getNewsBySlug,
  getNewsCopy,
  getSoraya,
  fundingStatus,
  safeUrl,
  displayDate,
  publicPostFilter,
} from "./news";
beforeEach(() => {
  cms.fetch.mockReset();
});
describe("public Content Hub", () => {
  it("renders supplied local content if Sanity is unavailable", async () => {
    cms.fetch.mockRejectedValue(new Error("offline"));
    expect(await getNews(3)).toEqual(fallbackNews);
    expect(await getNewsBySlug(fallbackNews[0].slug)).toEqual(fallbackNews[0]);
    expect(await getNewsBySlug("missing")).toBeNull();
    expect(await getNewsCopy()).toEqual(newsCopy);
    expect(await getSoraya()).not.toHaveProperty("bio");
  });
  it("preserves an intentionally empty CMS rather than resurrecting local articles", async () => {
    cms.fetch.mockResolvedValue([]);
    expect(await getNews()).toEqual([]);
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
    const copy = await getNewsCopy();
    expect(copy.title).toBe("Actualidad");
    expect(copy.empty).toBe(newsCopy.empty);
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
