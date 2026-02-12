import { postSchema, type Post } from '@longbestai/shared';
import contentBundle from './.generated/content-bundle.json';

let postsCache: Post[] | null = null;

/**
 * Get all blog posts, sorted by date descending
 */
export function getAllPosts(): Post[] {
  // Production: use cache
  if (process.env.NODE_ENV === 'production' && postsCache) {
    return postsCache;
  }

  // Load from pre-generated bundle and validate
  const posts = contentBundle.posts.map(p => postSchema.parse(p));

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (process.env.NODE_ENV === 'production') {
    postsCache = posts;
  }

  return posts;
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find(p => p.slug === slug) || null;
}

/**
 * Get all post slugs (for generateStaticParams)
 */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map(p => p.slug);
}
