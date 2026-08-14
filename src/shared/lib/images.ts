import type { ImageMetadata } from "astro";

// Vite only matches relative globs (./ or ../). An absolute "/src/..." pattern
// matches nothing, so every photo fell back to a public URL that no longer exists.
const assets = import.meta.glob<{ default: ImageMetadata }>("../../assets/images/**/*.{jpg,jpeg,png}", {
  eager: true,
});

/**
 * Site config stores photos as public-style paths ("/images/hero/rcc-1.jpg").
 * The files themselves live in src/assets so that Astro can optimise them.
 */
export function resolveImage(path: string): ImageMetadata | undefined {
  const key = path.replace(/^\/images\//, "../../assets/images/");
  return assets[key]?.default;
}
