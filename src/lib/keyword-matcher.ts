/**
 * Extract keywords from text using regex
 * For Chinese: extract individual characters (since Chinese has no word boundaries)
 * For English: extract whole words
 */
export function extractKeywords(text: string): string[] {
  // Match individual Chinese characters OR English words
  const regex = /[\u4e00-\u9fa5]|[a-zA-Z]+/g;
  const matches = text.match(regex) || [];
  // Deduplicate and convert to lowercase
  return [...new Set(matches.map(s => s.toLowerCase()))];
}

/**
 * Calculate similarity between two titles using Jaccard index
 */
export function calculateSimilarity(title1: string, title2: string): number {
  const keywords1 = extractKeywords(title1);
  const keywords2 = extractKeywords(title2);

  if (keywords1.length === 0 || keywords2.length === 0) return 0;

  // Calculate intersection count
  const intersection = keywords1.filter(k => keywords2.includes(k));
  const unionSize = new Set([...keywords1, ...keywords2]).size;

  // Jaccard similarity
  return intersection.length / unionSize;
}
