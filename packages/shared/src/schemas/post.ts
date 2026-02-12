import { z } from 'zod';
import { isValidSlug } from '../utils/slug.js';

/**
 * Blog post schema
 *
 * Features:
 * - Auto-generate slug from title or allow override
 * - Normalize tags automatically
 * - Plain text body (no markdown yet)
 * - Optional visual suggestions
 */
export const postSchema = z.object({
  slug: z.string()
    .min(1, 'Slug không được để trống')
    .max(60, 'Slug không được vượt quá 60 ký tự')
    .refine(isValidSlug, {
      message: 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang'
    }),

  title: z.string()
    .min(1, 'Title không được để trống')
    .max(200, 'Title không được vượt quá 200 ký tự'),

  date: z.string()
    .datetime({ message: 'Date phải là ISO datetime string' })
    .default(() => new Date().toISOString()),

  excerpt: z.string()
    .min(1, 'Excerpt không được để trống')
    .max(500, 'Excerpt không được vượt quá 500 ký tự'),

  tags: z.array(z.string())
    .min(1, 'Phải có ít nhất 1 tag')
    .transform(tags => tags.map(t => t.trim().toLowerCase().replace(/\s+/g, '-'))),

  body: z.string()
    .min(1, 'Body không được để trống'),

  suggestedVisuals: z.array(z.string()).optional()
});

export type Post = z.infer<typeof postSchema>;
