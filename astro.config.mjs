// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { rehypeCodeFigure, rehypeFootnotes } from './src/plugins/rehype-signal.mjs';
import audit from './src/integrations/audit.mjs';
import { flag } from './src/config/flag.mjs';

// live on workers.dev until the custom domain is set up, then change this or set SITE_URL
const site = process.env.SITE_URL || 'https://portfolio-site.yoloburgur123.workers.dev';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'never' },
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },
  markdown: {
    syntaxHighlight: false,
    processor: unified({ rehypePlugins: [rehypeCodeFigure, rehypeFootnotes] }),
  },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/admin') && !page.includes(`/${flag.path}/`) && !page.includes(`/${flag.finalPath}/`) }), audit()],
});
