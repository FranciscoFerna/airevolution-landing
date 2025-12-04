import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ⚠️ CAMBIA ESTO POR TU DOMINIO REAL CUANDO LO TENGAS
  site: 'https://airevolution.es',

  output: 'server',
  adapter: vercel(),

  integrations: [
    react(),
    tailwind(),
    sitemap() 
  ],
});
