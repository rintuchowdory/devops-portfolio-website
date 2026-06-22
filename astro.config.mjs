// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://rintuchowdory.github.io',
  base: '/devops-portfolio-website',
  vite: {
    plugins: [tailwindcss()]
  }
});