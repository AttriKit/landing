/**
 * Utility functions for AttriKit website
 */

// Format date to Chinese locale
export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Calculate reading time (400 chars/min for Chinese)
export function calculateReadingTime(content: string): number {
  const wordCount = content?.length || 0;
  return Math.max(1, Math.ceil(wordCount / 400));
}

// Create Publisher for structured data
export function createPublisher() {
  return {
    "@type": "Organization",
    "name": "AttriKit",
    "logo": {
      "@type": "ImageObject",
      "url": "https://attrikit.com/favicon.png"
    }
  };
}
