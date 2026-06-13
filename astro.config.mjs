// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://steelyourcase.com',
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
