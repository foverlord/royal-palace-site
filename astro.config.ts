import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://royal-palace.a-a-studio.workers.dev',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  vite: { plugins: [tailwindcss() as any] },
});
