// Rewrites local /images/... references in source files to the Vercel Blob
// URLs recorded in scripts/blob-manifest.json (produced by
// migrate-images-to-blob.mjs). Run this after the real migration has
// uploaded files and written the manifest.
//
// Usage: node scripts/apply-blob-manifest.mjs

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const MANIFEST_PATH = join(process.cwd(), "scripts", "blob-manifest.json");

const TARGET_FILES = [
  "src/shared/config/site.ts",
  "src/widgets/About/About.astro",
];

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  const entries = Object.entries(manifest);

  if (entries.length === 0) {
    console.error("Manifest is empty, nothing to apply.");
    process.exit(1);
  }

  for (const relPath of TARGET_FILES) {
    const filePath = join(process.cwd(), relPath);
    let content = await readFile(filePath, "utf8");
    let replacements = 0;

    for (const [localPath, blobUrl] of entries) {
      const quoted = `"${localPath}"`;
      if (content.includes(quoted)) {
        content = content.split(quoted).join(`"${blobUrl}"`);
        replacements += 1;
      }
    }

    if (replacements > 0) {
      await writeFile(filePath, content);
      console.log(`${relPath}: ${replacements} reference(s) updated`);
    } else {
      console.log(`${relPath}: no matching references found`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
