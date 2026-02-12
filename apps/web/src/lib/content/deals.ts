import { dealSchema, type Deal } from '@longbestai/shared';
import contentBundle from './.generated/content-bundle.json';

let dealsCache: Deal[] | null = null;

/**
 * Get all deals, sorted by title
 */
export function getAllDeals(): Deal[] {
  if (process.env.NODE_ENV === 'production' && dealsCache) {
    return dealsCache;
  }

  // Load from pre-generated bundle and validate
  const deals = contentBundle.deals.map(d => dealSchema.parse(d));

  deals.sort((a, b) => a.title.localeCompare(b.title));

  if (process.env.NODE_ENV === 'production') {
    dealsCache = deals;
  }

  return deals;
}

/**
 * Get a single deal by slug
 */
export function getDealBySlug(slug: string): Deal | null {
  return getAllDeals().find(d => d.slug === slug) || null;
}

/**
 * Get all deal slugs (for generateStaticParams)
 */
export function getAllDealSlugs(): string[] {
  return getAllDeals().map(d => d.slug);
}
