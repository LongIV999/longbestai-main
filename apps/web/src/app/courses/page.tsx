import { getAllCourses } from '@/lib/content/courses';
import { CourseCard } from '@/components/content/course-card';

export const metadata = {
  title: 'Courses - LongBestAI',
  description: 'Khóa học về AI automation và OpenClaw'
};

export default async function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Courses</h1>
      <p className="text-muted-foreground mb-12 text-lg">
        Học cách sử dụng AI automation để tăng năng suất
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>

      {courses.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          Chưa có khóa học nào.
        </p>
      )}
    </div>
  );
}
