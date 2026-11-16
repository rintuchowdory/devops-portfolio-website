// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// The Pages workflow passes SITE and BASE from actions/configure-pages, so the
// same build works for a project page and a custom domain.
const site = process.env.SITE ?? 'https://rintuchowdory.github.io';
const base = process.env.BASE ?? '/devops-portfolio-website';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
