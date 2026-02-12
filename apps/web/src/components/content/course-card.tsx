import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Course } from '@longbestai/shared';

const LEVEL_LABELS: Record<'beginner' | 'intermediate' | 'advanced', string> = {
  beginner: 'Cơ bản',
  intermediate: 'Trung cấp',
  advanced: 'Nâng cao'
};

export function CourseCard({ course }: { course: Course }) {
  const priceDisplay = course.price
    ? typeof course.price === 'number'
      ? `${course.price.toLocaleString('vi-VN')}đ`
      : course.price
    : 'Miễn phí';

  const levelLabel = LEVEL_LABELS[course.level as keyof typeof LEVEL_LABELS];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{levelLabel}</Badge>
          <span className="text-sm font-semibold text-primary">{priceDisplay}</span>
        </div>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>
          {course.lessons.length} bài học
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Bạn sẽ học được:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {course.outcome.slice(0, 3).map((item: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">✓</span>
                <span className="line-clamp-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
