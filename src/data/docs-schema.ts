import type { CollectionEntry } from 'astro:content';
import { calculateReadingTime, createPublisher } from '../lib/utils';

// Generate TechArticle schema for documentation pages
export function generateTechArticleSchema(doc: CollectionEntry<'docs'>) {
  const { data, slug } = doc;
  const url = `https://attrikit.com/docs/${slug}/`;

  // Calculate reading time using utils
  const wordCount = doc.body?.length || 0;
  const readTimeMinutes = calculateReadingTime(doc.body || '');

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": data.title,
    "description": data.description,
    "image": "https://attrikit.com/og.webp",
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "AttriKit"
    },
    "publisher": createPublisher(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "proficiencyLevel": "Beginner",
    "dependencies": "AttriKit SDK",
    "wordCount": wordCount,
    "timeRequired": `PT${readTimeMinutes}M`
  };
}
