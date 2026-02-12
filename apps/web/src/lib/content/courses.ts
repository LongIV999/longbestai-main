import fs from 'fs';
import path from 'path';
import { courseSchema, type Course } from '@longbestai/shared';

const COURSES_DIR = path.join(process.cwd(), '../../content/courses');
let coursesCache: Course[] | null = null;

/**
 * Get all courses, sorted by title
 */
export function getAllCourses(): Course[] {
  if (process.env.NODE_ENV === 'production' && coursesCache) {
    return coursesCache;
  }

  const files = fs.readdirSync(COURSES_DIR).filter(f => f.endsWith('.json'));
  const courses = files.map(file => {
    const content = JSON.parse(fs.readFileSync(path.join(COURSES_DIR, file), 'utf-8'));
    return courseSchema.parse(content);
  });

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
