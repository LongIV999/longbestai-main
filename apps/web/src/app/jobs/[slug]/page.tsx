import { notFound } from 'next/navigation';
import { getJobByFilename, getAllJobFilenames } from '@/lib/content/jobs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { JobOverlayItem } from '@longbestai/shared';

export async function generateStaticParams() {
  return getAllJobFilenames().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJobByFilename(slug);

  if (!job) return {};

  return {
    title: `${job.meta.brand} - Job - LongBestAI`,
    description: job.caption.slice(0, 150)
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJobByFilename(slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">{job.meta.brand}</h1>
        <Badge variant="secondary">{job.meta.content_type}</Badge>
      </div>

      <time className="text-muted-foreground block mb-8">
        {new Date(job.meta.date).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Caption</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{job.caption}</p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Render Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <span className="font-semibold">Preset:</span> {job.render.preset}
          </p>
          <p>
            <span className="font-semibold">Theme:</span> {job.render.theme}
          </p>
          {job.render.card?.background && (
            <p>
              <span className="font-semibold">Background:</span>{' '}
              <span
                className="inline-block w-6 h-6 rounded border align-middle ml-2"
                style={{ backgroundColor: job.render.card.background }}
              />
              {' '}{job.render.card.background}
            </p>
          )}
          {job.render.card?.width && job.render.card?.height && (
            <p>
              <span className="font-semibold">Dimensions:</span>{' '}
              {job.render.card.width} x {job.render.card.height}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overlay Elements ({job.overlay.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {job.overlay.map((item: JobOverlayItem, idx: number) => (
              <div key={idx} className="p-4 bg-muted rounded-lg">
                <div className="font-semibold mb-2">
                  {idx + 1}. {item.type}
                </div>
                <div className="text-sm space-y-1">
                  {item.type === 'stickerRect' && (
                    <>
                      <p>Text: {item.text}</p>
                      <p>Position: ({item.x}, {item.y})</p>
                      <p>Size: {item.width} x {item.height}</p>
                      {item.color && <p>Color: {item.color}</p>}
                      {item.rotation && <p>Rotation: {item.rotation}°</p>}
                    </>
                  )}
                  {item.type === 'arrow' && (
                    <>
                      <p>From: ({item.x1}, {item.y1})</p>
                      <p>To: ({item.x2}, {item.y2})</p>
                      {item.color && <p>Color: {item.color}</p>}
                      {item.strokeWidth && <p>Stroke Width: {item.strokeWidth}</p>}
                    </>
                  )}
                  {item.type === 'highlightScribble' && (
                    <>
                      <p>Position: ({item.x}, {item.y})</p>
                      <p>Size: {item.width} x {item.height}</p>
                      {item.color && <p>Color: {item.color}</p>}
                    </>
                  )}
                  {item.type === 'icon' && (
                    <>
                      <p>Icon: {item.iconName}</p>
                      <p>Position: ({item.x}, {item.y})</p>
                      {item.size && <p>Size: {item.size}</p>}
                      {item.color && <p>Color: {item.color}</p>}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
