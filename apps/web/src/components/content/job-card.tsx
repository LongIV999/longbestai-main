import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { Job } from '@longbestai/shared';

interface JobCardProps {
  job: Job;
  filename: string;
}

export function JobCard({ job, filename }: JobCardProps) {
  const preview = job.caption.slice(0, 150) + (job.caption.length > 150 ? '...' : '');

  return (
    <Link href={`/jobs/${filename}`} className="block h-full">
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{job.meta.brand}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {job.meta.content_type}
            </span>
          </CardTitle>
          <CardDescription>
            {new Date(job.meta.date).toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">
            {preview}
          </p>
          <div className="mt-4 text-xs text-muted-foreground">
            {job.overlay.length} overlay elements • {job.render.theme}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
