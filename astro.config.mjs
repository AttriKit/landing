// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://attrikit.com',
  integrations: [
    sitemap({
      // Format XML with proper indentation
      serialize(item) {
        // Set lastmod to current date for all pages
        item.lastmod = new Date();

        // Set priority based on URL depth
        if (item.url === 'https://attrikit.com/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/blog/') && !item.url.endsWith('/blog/')) {
          // Individual blog posts
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.endsWith('/blog/')) {
          // Blog index page
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else {
          // Other pages
          item.priority = 0.7;
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
