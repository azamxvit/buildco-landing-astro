// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  build: {
    // The stylesheet is small enough that inlining it beats a blocking request.
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});