import { removeDiacritics } from './vietnamese-diacritics.js';

/**
 * Generate URL-safe slug from Vietnamese or English text
 *
 * Algorithm:
 * 1. Remove Vietnamese diacritics (á→a, đ→d, etc.)
 * 2. Convert to lowercase
 * 3. Strip special characters (keep only a-z, 0-9, spaces, hyphens)
 * 4. Convert spaces to hyphens
 * 5. Remove consecutive hyphens
 * 6. Trim leading/trailing hyphens
 * 7. Truncate to max 60 characters
 *
 * @example
 * generateSlug("Giới thiệu OpenClaw") // "gioi-thieu-openclaw"
 * generateSlug("AI Automation 2024!") // "ai-automation-2024"
 */
export function generateSlug(text: string, maxLength = 60): string {
  return removeDiacritics(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Spaces to hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
    .replace(/^-+|-+$/g, '') // Trim hyphens
    .slice(0, maxLength);
}

/**
 * Validate slug format (lowercase, alphanumeric + hyphens only)
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug) && slug.length > 0 && slug.length <= 60;
}
