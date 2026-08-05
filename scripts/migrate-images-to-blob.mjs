// One-off migration: uploads photo content from public/images to Vercel Blob
// and writes a manifest mapping old local paths to new Blob URLs.
//
// Usage: node --env-file=.env.local scripts/migrate-images-to-blob.mjs [--dry-run]
//
// Requires BLOB_READ_WRITE_TOKEN in the environment (from a Vercel Blob store
// linked to this project).

import { put } from "@vercel/blob";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const DRY_RUN = process.argv.includes("--dry-run");

// Directories/files under public/images that hold actual photo content.
// Brand assets (logo, favicon, decorative svg) stay in the repo.
const TARGETS = ["hero", "projects", "clients", "awards", "og-default.jpg"];

const PUBLIC_IMAGES = join(process.cwd(), "public", "images");
const MANIFEST_PATH = join(process.cwd(), "scripts", "blob-manifest.json");

async function collectFiles(entryPath) {
  const s = await stat(entryPath);
  if (s.isFile()) return [entryPath];

  const entries = await readdir(entryPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(entryPath, entry.name);
      return entry.isDirectory() ? collectFiles(full) : Promise.resolve([full]);
    }),
  );
  return files.flat();
}

async function main() {
  if (!DRY_RUN && !process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("Missing BLOB_READ_WRITE_TOKEN. Run with --dry-run to preview, or set the token in .env.");
    process.exit(1);
  }

  const allFiles = (
    await Promise.all(TARGETS.map((t) => collectFiles(join(PUBLIC_IMAGES, t))))
  ).flat();

  console.log(`Found ${allFiles.length} files to migrate.\n`);

  const manifest = {};
  let uploaded = 0;
  let totalBytes = 0;

  for (const filePath of allFiles) {
    const relFromImages = relative(PUBLIC_IMAGES, filePath).split("\\").join("/");
    const localPath = `/images/${relFromImages}`;
    const blobPathname = `images/${relFromImages}`;

    if (DRY_RUN) {
      console.log(`[dry-run] ${localPath} -> images/${relFromImages}`);
      continue;
    }

    const buffer = await readFile(filePath);
    totalBytes += buffer.byteLength;

    const blob = await put(blobPathname, buffer, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    manifest[localPath] = blob.url;
    uploaded += 1;
    console.log(`${localPath} -> ${blob.url}`);
  }

  if (DRY_RUN) {
    console.log("\nDry run complete. No files were uploaded.");
    return;
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nUploaded ${uploaded} files (${(totalBytes / 1024 / 1024).toFixed(1)} MB).`);
  console.log(`Manifest written to ${relative(process.cwd(), MANIFEST_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
