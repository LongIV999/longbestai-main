import { z } from 'zod';

/**
 * Job meta schema
 */
export const jobMetaSchema = z.object({
  brand: z.string().min(1),
  date: z.string().datetime(),
  content_type: z.enum(['job', 'post', 'deal'])
});

/**
 * Job render settings schema
 */
export const jobRenderSchema = z.object({
  preset: z.string().min(1),
  theme: z.string().min(1),
  card: z.object({
    background: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional()
  }).optional()
});

/**
 * Job overlay item schemas (visual elements)
 */
export const jobOverlayStickerRectSchema = z.object({
  type: z.literal('stickerRect'),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  text: z.string(),
  color: z.string().optional(),
  rotation: z.number().optional()
});

export const jobOverlayArrowSchema = z.object({
  type: z.literal('arrow'),
  x1: z.number(),
  y1: z.number(),
  x2: z.number(),
  y2: z.number(),
  color: z.string().optional(),
  strokeWidth: z.number().optional()
});

export const jobOverlayHighlightSchema = z.object({
  type: z.literal('highlightScribble'),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  color: z.string().optional()
});

export const jobOverlayIconSchema = z.object({
  type: z.literal('icon'),
  x: z.number(),
  y: z.number(),
  iconName: z.string(),
  size: z.number().optional(),
  color: z.string().optional()
});

export const jobOverlayItemSchema = z.discriminatedUnion('type', [
  jobOverlayStickerRectSchema,
  jobOverlayArrowSchema,
  jobOverlayHighlightSchema,
  jobOverlayIconSchema
]);

/**
 * Job schema (visual-first job postings)
 *
 * CRITICAL: Caption must be plain text, NO markdown headings (# )
 * Compatible with social_card_to_image format
 */
export const jobSchema = z.object({
  meta: jobMetaSchema,

  caption: z.string()
    .min(1, 'Caption không được để trống')
    .refine(
      (caption) => !caption.startsWith('# ') && !caption.includes('\n# '),
      { message: 'Caption phải là plain text, KHÔNG được chứa markdown headings (# )' }
    ),

  render: jobRenderSchema,

  overlay: z.array(jobOverlayItemSchema)
    .max(10, 'Không nên có quá 10 overlay items để tránh clutter')
});

export type Job = z.infer<typeof jobSchema>;
export type JobMeta = z.infer<typeof jobMetaSchema>;
export type JobRender = z.infer<typeof jobRenderSchema>;
export type JobOverlayItem = z.infer<typeof jobOverlayItemSchema>;
