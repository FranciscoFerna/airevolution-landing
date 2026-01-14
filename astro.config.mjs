import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://airevolution-landing.vercel.app/',

  output: 'server',
  adapter: vercel(),

  integrations: [
    react(),
    tailwind(),
    sitemap()
  ],
});
