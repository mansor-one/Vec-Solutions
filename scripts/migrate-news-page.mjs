import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

// Offline only: creates new document IDs and preserves every source field.
export function migrateNewsPage(document) {
  if (document._type !== "newsPage") return null;
  if (typeof document._id !== "string") throw new Error("newsPage sin _id");
  const copy = { ...document };
  for (const field of ["_rev", "_createdAt", "_updatedAt"]) delete copy[field];
  const draft = document._id.startsWith("drafts.");
  const sourceId = draft ? document._id.slice(7) : document._id;
  copy._id = `${draft ? "drafts." : ""}contentHubSettings.migrated.${sourceId}`;
  copy._type = "contentHubSettings";
  for (const [oldField, newField] of Object.entries({
    allLabel: "allNews",
    readLabel: "readMore",
    backLabel: "back",
    navigationLabel: "navLabel",
    profileHeading: "profileTitle",
  })) {
    if (copy[newField] == null && copy[oldField] != null)
      copy[newField] = copy[oldField];
  }
  return copy;
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const [input, output] = process.argv.slice(2);
  if (!input || !output || input === output)
    throw new Error(
      "Uso: node scripts/migrate-news-page.mjs export.ndjson migrated.ndjson (archivo nuevo)",
    );
  const docs = (await readFile(input, "utf8"))
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
  const migrated = docs.map(migrateNewsPage).filter(Boolean);
  await writeFile(
    output,
    migrated.map((doc) => JSON.stringify(doc)).join("\n") +
      (migrated.length ? "\n" : ""),
    { flag: "wx" },
  );
  process.stdout.write(
    `${migrated.length} documentos preparados; no se modificó Sanity.\n`,
  );
}
