import { z } from 'zod';
import { isValidSlug } from '../utils/slug.js';

/**
 * Course lesson schema
 */
export const courseLessonSchema = z.object({
  title: z.string().min(1, 'Lesson title không được để trống'),
  summary: z.string().min(1, 'Lesson summary không được để trống')
});

/**
 * Course schema
 *
 * Features:
 * - 3 difficulty levels
 * - Learning outcomes (min 1)
 * - Structured lessons (min 4)
 * - Optional pricing
 */
export const courseSchema = z.object({
  slug: z.string()
    .min(1)
    .max(60)
    .refine(isValidSlug, {
      message: 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang'
    }),

  title: z.string()
    .min(1, 'Title không được để trống')
    .max(200),

  level: z.enum(['beginner', 'intermediate', 'advanced'], {
    errorMap: () => ({ message: 'Level phải là beginner, intermediate hoặc advanced' })
  }),

  outcome: z.array(z.string())
    .min(1, 'Phải có ít nhất 1 learning outcome'),

  lessons: z.array(courseLessonSchema)
    .min(4, 'Course phải có ít nhất 4 lessons'),

  price: z.union([z.number(), z.string()]).optional(),
  notes: z.string().optional()
});

export type Course = z.infer<typeof courseSchema>;
export type CourseLesson = z.infer<typeof courseLessonSchema>;
