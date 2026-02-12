import fs from 'fs';
import path from 'path';
import { postSchema, type Post } from '@longbestai/shared';

const POSTS_DIR = path.join(process.cwd(), '../../content/posts');
let postsCache: Post[] | null = null;

/**
 * Get all blog posts, sorted by date descending
 */
export function getAllPosts(): Post[] {
  // Production: use cache
  if (process.env.NODE_ENV === 'production' && postsCache) {
    return postsCache;
  }

  // Read and validate JSON files
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.json'));
  const posts = files.map(file => {
    const content = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8'));
    return postSchema.parse(content);
  });

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
