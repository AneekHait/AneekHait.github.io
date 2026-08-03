// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// No `base` is set: this repo is a <username>.github.io user site served from the domain root.
export default defineConfig({
  site: 'https://aneekhait.github.io',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-default', wrap: true },
  },
});
