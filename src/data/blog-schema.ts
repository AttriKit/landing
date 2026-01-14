import type { CollectionEntry } from 'astro:content';

// Generate Article schema for blog posts
export function generateArticleSchema(post: CollectionEntry<'blog'>) {
  const { data, slug } = post;
  const url = `https://attrikit.com/blog/${slug}/`;

  // Calculate reading time
  const wordCount = post.body?.length || 0;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 400));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "image": "https://attrikit.com/og.webp",
    "datePublished": data.pubDate.toISOString(),
    "dateModified": data.pubDate.toISOString(),
    "author": {
      "@type": "Organization",
      "name": data.author
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
    "wordCount": wordCount,
    "timeRequired": `PT${readTimeMinutes}M`
  };
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(items: Array<{label: string; href?: string}>) {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.label,
    ...(item.href && { "item": item.href })
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement
  };
}

// Extract FAQ sections from markdown content
export function extractFAQsFromContent(content: string): Array<{question: string; answer: string}> {
  const faqs: Array<{question: string; answer: string}> = [];

  // Match FAQ patterns: ### Q: ... or ### Q1... followed by **A:** or **A：**
  const faqPattern = /### [Qq]\d*[:：]\s*(.+?)\n\n\*\*[Aa][:：]\*\*\s*(.+?)(?=\n\n### |\n\n## |\n\n---|$)/gs;

  let match;
  while ((match = faqPattern.exec(content)) !== null) {
    faqs.push({
      question: match[1].trim(),
      answer: match[2].trim()
    });
  }

  return faqs;
}

// Generate FAQPage schema
export function generateFAQSchema(faqs: Array<{question: string; answer: string}>) {
  const mainEntity = faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity
  };
}
