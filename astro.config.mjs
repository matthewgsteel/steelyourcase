// @ts-check
import editableRegions from '@cloudcannon/editable-regions/astro-integration';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://steelyourcase.com',
  integrations: [editableRegions()],
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
