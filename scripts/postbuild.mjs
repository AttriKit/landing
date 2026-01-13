#!/usr/bin/env node

import { renameSync, unlinkSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');

const sitemap0 = join(distDir, 'sitemap-0.xml');
const sitemapIndex = join(distDir, 'sitemap-index.xml');
const sitemap = join(distDir, 'sitemap.xml');

try {
  // Rename sitemap-0.xml to sitemap.xml
  if (existsSync(sitemap0)) {
    renameSync(sitemap0, sitemap);
    console.log('Renamed sitemap-0.xml to sitemap.xml');
  }

  // Remove sitemap-index.xml (not needed for single sitemap)
  if (existsSync(sitemapIndex)) {
    unlinkSync(sitemapIndex);
    console.log('Removed sitemap-index.xml');
  }

  console.log('Sitemap post-build complete!');
} catch (error) {
  console.error('Post-build error:', error);
  process.exit(1);
}
