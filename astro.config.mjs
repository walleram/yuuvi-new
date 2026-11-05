// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { getNoindexTagPaths } from './scripts/tag-counts.mjs';

// https://astro.build/config
const noindexTagPaths = getNoindexTagPaths();

export default defineConfig({
  site: 'https://www.yuuvi.cat',
  output: 'static',
  integrations: [
    sitemap({
      // Mantén fuera del sitemap los tags que la página marca como noindex.
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !noindexTagPaths.has(pathname.endsWith('/') ? pathname : `${pathname}/`);
      },
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ca'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 1024,
    },
  },
  // Los discos externos exFAT/FAT32 generan ficheros AppleDouble (._*) que
  // ensucian dist/ y acaban desplegándose. Los excluimos del contenido final.
  compressHTML: true,
});
