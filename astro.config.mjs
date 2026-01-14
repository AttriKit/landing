// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://attrikit.com',
  integrations: [
    sitemap()
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
