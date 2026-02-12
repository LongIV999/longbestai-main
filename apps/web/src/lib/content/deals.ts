import fs from 'fs';
import path from 'path';
import { dealSchema, type Deal } from '@longbestai/shared';

const DEALS_DIR = path.join(process.cwd(), '../../content/deals');
let dealsCache: Deal[] | null = null;

/**
 * Get all deals, sorted by title
 */
export function getAllDeals(): Deal[] {
  if (process.env.NODE_ENV === 'production' && dealsCache) {
    return dealsCache;
  }

  const files = fs.readdirSync(DEALS_DIR).filter(f => f.endsWith('.json'));
  const deals = files.map(file => {
    const content = JSON.parse(fs.readFileSync(path.join(DEALS_DIR, file), 'utf-8'));
    return dealSchema.parse(content);
  });

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
