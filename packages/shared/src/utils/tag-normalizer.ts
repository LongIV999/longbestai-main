/**
 * Normalize tags to consistent format
 *
 * Algorithm:
 * 1. Trim whitespace
 * 2. Convert to lowercase
 * 3. Replace spaces with hyphens
 * 4. Strip special characters (keep only a-z, 0-9, hyphens)
 * 5. Remove consecutive hyphens
 *
 * @example
 * normalizeTag("AI Automation") // "ai-automation"
 * normalizeTag("  Next.js  ") // "nextjs"
 */
export function normalizeTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Normalize an array of tags
 */
export function normalizeTags(tags: string[]): string[] {
  return tags
    .map(normalizeTag)
    .filter(tag => tag.length > 0);
}
