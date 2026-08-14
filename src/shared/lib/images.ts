import type { ImageMetadata } from "astro";

const assets = import.meta.glob<{ default: ImageMetadata }>("/src/assets/images/**/*.{jpg,jpeg,png}", {
  eager: true,
});

/**
 * Site config stores photos as public-style paths ("/images/hero/rcc-1.jpg").
 * The files themselves live in src/assets so that Astro can optimise them,
 * so paths are translated here instead of in the config.
 */
export function resolveImage(path: string): ImageMetadata | undefined {
  return assets[path.replace(/^\/images\//, "/src/assets/images/")]?.default;
}
