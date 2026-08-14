// Copies the woff2 subsets we actually use from the Fontsource packages into
// public/fonts, so fonts are served from our own origin with stable URLs
// (stable URLs are what make <link rel="preload"> possible).
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(root, "public", "fonts");

const files = [
  "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  "@fontsource-variable/inter/files/inter-cyrillic-wght-normal.woff2",
  "@fontsource-variable/inter/files/inter-cyrillic-ext-wght-normal.woff2",
  "@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2",
];

await mkdir(target, { recursive: true });

for (const file of files) {
  const name = file.split("/").pop();
  await copyFile(join(root, "node_modules", file), join(target, name));
  console.log(`fonts: ${name}`);
}
