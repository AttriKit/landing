import type { CollectionEntry } from 'astro:content';

// Generate TechArticle schema for documentation pages
export function generateTechArticleSchema(doc: CollectionEntry<'docs'>) {
  const { data, slug } = doc;
  const url = `https://attrikit.com/docs/${slug}/`;

  // Calculate reading time
  const wordCount = doc.body?.length || 0;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 400));

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
    "publisher": {
      "@type": "Organization",
      "name": "AttriKit",
      "logo": {
        "@type": "ImageObject",
        "url": "https://attrikit.com/favicon.png"
      }
    },
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
