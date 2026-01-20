// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: 'https://attrikit.com',
  integrations: [
    pagefind({
      // @ts-expect-error - verbose option exists in runtime but not in types
      verbose: true,
    }),
    sitemap({
      // Format XML with proper indentation
      serialize(item) {
        // Set lastmod to current date for all pages (ISO string format)
        item.lastmod = new Date().toISOString();

        // Set priority based on URL depth
        if (item.url === 'https://attrikit.com/') {
          item.priority = 1.0;
          // @ts-expect-error - valid changefreq value
          item.changefreq = 'weekly';
        } else if (item.url.includes('/blog/') && !item.url.endsWith('/blog/')) {
          // Individual blog posts
          item.priority = 0.8;
          // @ts-expect-error - valid changefreq value
          item.changefreq = 'monthly';
        } else if (item.url.endsWith('/blog/')) {
          // Blog index page
          item.priority = 0.9;
          // @ts-expect-error - valid changefreq value
          item.changefreq = 'weekly';
        } else if (item.url.includes('/docs/') && !item.url.endsWith('/docs/')) {
          // Individual doc pages
          item.priority = 0.9;
          // @ts-expect-error - valid changefreq value
          item.changefreq = 'weekly';
        } else if (item.url.endsWith('/docs/')) {
          // Docs index page
          item.priority = 0.95;
          // @ts-expect-error - valid changefreq value
          item.changefreq = 'weekly';
        } else {
          // Other pages
          item.priority = 0.7;
          // @ts-expect-error - valid changefreq value
          item.changefreq = 'monthly';
        }

        return item;
      }
    })
  ],
  adapter: cloudflare({
    // Disable session management (not needed for this project)
    imageService: 'compile',
  }),
  env: {
    schema: {
      FEISHU_WEBHOOK_URL: {
        type: 'string',
        access: 'secret',
        context: 'server',
      },
      FEISHU_SIGN_KEY: {
        type: 'string',
        access: 'secret',
        context: 'server',
      },
    },
  },
});
