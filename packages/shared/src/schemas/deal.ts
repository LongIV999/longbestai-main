import { z } from 'zod';
import { isValidSlug } from '../utils/slug.js';

/**
 * Deal item schema (for multi-tier pricing)
 */
export const dealItemSchema = z.object({
  title: z.string().min(1),
  duration: z.string().optional(),
  warranty: z.string().optional(),
  cost: z.union([z.number(), z.string()]).optional(),
  retail: z.union([z.number(), z.string()]).optional(),
  inventory: z.number().int().optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional()
});

/**
 * Deal/Pricing schema
 *
 * Features:
 * - Simple deals: title + price + notes
 * - Multi-tier pricing: items array with cost/retail
 * - Inventory tracking
 * - Tags for categorization
 */
export const dealSchema = z.object({
  slug: z.string()
    .min(1)
    .max(60)
    .refine(isValidSlug, {
      message: 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang'
    }),

  title: z.string()
    .min(1, 'Title không được để trống')
    .max(200),

  price: z.union([z.number(), z.string()]),

  duration: z.string().optional(),
  warranty: z.string().optional(),
  inventory: z.number().int().optional(),
  notes: z.string().optional(),

  tags: z.array(z.string())
    .min(1, 'Phải có ít nhất 1 tag')
    .transform(tags => tags.map(t => t.trim().toLowerCase().replace(/\s+/g, '-'))),

  items: z.array(dealItemSchema).optional()
});

export type Deal = z.infer<typeof dealSchema>;
export type DealItem = z.infer<typeof dealItemSchema>;
