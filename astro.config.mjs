// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://yuuvi-new.pages.dev',
  output: 'static',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
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
