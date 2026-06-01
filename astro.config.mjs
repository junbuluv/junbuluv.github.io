// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// junbuluv.github.io: static build, .html URL format to preserve existing SEO/canonicals.
// sitemap.xml is hand-maintained in public/ (it also lists PDF assets).
export default defineConfig({
  site: 'https://junbuluv.github.io',
  output: 'static',
  build: {
    format: 'file',
  },
  integrations: [tailwind({ applyBaseStyles: false })],
});
