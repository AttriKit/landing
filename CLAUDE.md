# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the AttriKit marketing website - an Astro-based static site deployed on Cloudflare Pages. It serves as the official product landing page and blog for AttriKit, a first-party advertising attribution system for Chinese advertisers.

**Tech Stack:** Astro 5.x + TypeScript + Cloudflare Pages

## Development Commands

```bash
# Start dev server (runs on localhost:4321)
npm run dev

# Build for production (includes postbuild sitemap processing)
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI directly
npm run astro ...
```

**Important:** `npm run build` runs two steps:
1. `astro build` - generates static files to `dist/`
2. `node scripts/postbuild.mjs` - renames sitemap-0.xml → sitemap.xml and formats it

## Architecture

### Directory Structure

- `src/components/` - Reusable Astro UI components (Header, Footer, ConsultationModal, blog components)
- `src/content/blog/` - Markdown blog posts managed by Astro Content Collections
- `src/pages/` - File-based routing (index.astro, blog index/detail pages, API routes)
- `src/data/` - Structured data generators for SEO (schemas for Organization, Article, FAQPage, etc.)
- `src/lib/` - Utilities (feishu.ts for webhook integration, types.ts for TypeScript definitions)
- `src/styles/global.css` - Global styles with CSS variable system (colors, typography, spacing)
- `public/` - Static assets (favicon, OG images, robots.txt, _routes.json for Cloudflare)
- `scripts/postbuild.mjs` - Sitemap post-processing script

### Key Systems

**1. Blog System (Astro Content Collections)**
- Schema defined in `src/content/config.ts`
- Required frontmatter: `title`, `description`, `pubDate`, `author`
- Optional: `canonical` (for custom URL normalization)
- Each post auto-generates routes at `/blog/[slug]/`

**2. Consultation Form**
- Modal component: `src/components/ConsultationModal.astro`
- API endpoint: `src/pages/api/consultation.ts` (SSR, not pre-rendered)
- Integration: Feishu webhook via `src/lib/feishu.ts`
- Validation: Email format + 11-digit China phone number

**3. SEO Architecture**
- Sitemap auto-generated with custom priorities (see `astro.config.mjs`)
- Structured data: `src/data/structured-data.ts` (Organization, WebSite, SoftwareApplication)
- Blog schemas: `src/data/blog-schema.ts` (Article, BreadcrumbList, FAQPage)
- All pages include Open Graph and Twitter Card meta tags
- Robots.txt optimized for Baidu and Google

**4. Styling System**
- No CSS framework - custom responsive design
- CSS variables in `src/styles/global.css`:
  - Primary color: #0A5F8F (deep ocean blue)
  - Accent color: #00B4A6 (cyan)
  - Typography: Plus Jakarta Sans (headings) + Manrope (body)
  - 4px spacing unit system
  - Cool-toned shadow system

## Environment Variables

Required for consultation form submission (defined in `astro.config.mjs` as server secrets):
- `FEISHU_WEBHOOK_URL` - Feishu bot webhook URL
- `FEISHU_SIGN_KEY` - Feishu webhook signature key

Set these in Cloudflare Pages environment variables for production.

## Deployment

**Target:** Cloudflare Pages
- Adapter: `@astrojs/cloudflare`
- Edge functions handle API routes
- Static assets served via CDN
- `public/_routes.json` excludes static resources from edge functions

## Code Conventions

- **Language:** Chinese UI text, English comments and variable names
- **TypeScript:** Strict mode enabled (extends `astro/tsconfigs/strict`)
- **Commit messages:** Chinese, descriptive (e.g., "Add structured data schemas for blog SEO")
- **Component structure:** Astro components with clear separation of concerns
- **SEO-first:** All pages must have complete meta tags and structured data

## Important Notes

- Blog posts use frontmatter with date in `YYYY-MM-DD` format
- Reading time is calculated at ~400 characters/minute
- FAQ sections in blog posts are automatically extracted for structured data
- Sitemap is reformatted post-build for proper XML indentation
- The site URL is `https://attrikit.com` (hardcoded in astro.config.mjs)
