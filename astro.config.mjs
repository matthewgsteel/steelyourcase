// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://steelyourcase.com',
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: 'monthly',
      priority: 0.7,
      filter: (page) => !page.includes('/legal-disclaimers/') && !page.includes('/privacy-policy/'),
    }),
  ],
  build: {
    format: 'directory',
  },
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
  vite: {
    server: {
      host: '127.0.0.1',
      port: 4321,
    },
  },
});
