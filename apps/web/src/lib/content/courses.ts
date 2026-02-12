import { courseSchema, type Course } from '@longbestai/shared';
import contentBundle from './.generated/content-bundle.json';

let coursesCache: Course[] | null = null;

/**
 * Get all courses, sorted by title
 */
export function getAllCourses(): Course[] {
  if (process.env.NODE_ENV === 'production' && coursesCache) {
    return coursesCache;
  }

  // Load from pre-generated bundle and validate
  const courses = contentBundle.courses.map(c => courseSchema.parse(c));

  courses.sort((a, b) => a.title.localeCompare(b.title));

  if (process.env.NODE_ENV === 'production') {
    coursesCache = courses;
  }

  return courses;
}

/**
 * Get a single course by slug
 */
export function getCourseBySlug(slug: string): Course | null {
  return getAllCourses().find(c => c.slug === slug) || null;
}

/**
 * Get all course slugs (for generateStaticParams)
 */
export function getAllCourseSlugs(): string[] {
  return getAllCourses().map(c => c.slug);
}
