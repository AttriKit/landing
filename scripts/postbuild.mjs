#!/usr/bin/env node

import { renameSync, unlinkSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');

const sitemap0 = join(distDir, 'sitemap-0.xml');
const sitemapIndex = join(distDir, 'sitemap-index.xml');
const sitemap = join(distDir, 'sitemap.xml');

/**
 * Format XML with proper indentation
 */
function formatXML(xml) {
  const PADDING = '  '; // 2 spaces for indentation
  const reg = /(>)(<)(\/*)/g;
  let formatted = '';
  let pad = 0;

  xml = xml.replace(reg, '$1\n$2$3');

  xml.split('\n').forEach((node) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/) && pad > 0) {
      pad -= 1;
    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    formatted += PADDING.repeat(pad) + node + '\n';
    pad += indent;
  });

  return formatted.trim();
}

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

  // Format sitemap.xml
  if (existsSync(sitemap)) {
    const content = readFileSync(sitemap, 'utf-8');
    const formatted = formatXML(content);
    writeFileSync(sitemap, formatted, 'utf-8');
    console.log('Formatted sitemap.xml with proper indentation');
  }

  console.log('Sitemap post-build complete!');
} catch (error) {
  console.error('Post-build error:', error);
  process.exit(1);
}
