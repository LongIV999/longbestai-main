import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/content/posts';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} - LongBestAI`,
    description: post.excerpt
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <time className="text-muted-foreground block mb-6">
        {new Date(post.date).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>

      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag: string) => (
          <Badge key={tag} variant="outline">{tag}</Badge>
        ))}
      </div>

      <p className="text-lg text-muted-foreground mb-8 pb-8 border-b">
        {post.excerpt}
      </p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div style={{ whiteSpace: 'pre-wrap' }}>{post.body}</div>
      </div>

      {post.suggestedVisuals && post.suggestedVisuals.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">Hình ảnh đề xuất</h2>
          <ul className="list-disc list-inside text-muted-foreground">
            {post.suggestedVisuals.map((visual: string, idx: number) => (
              <li key={idx}>{visual}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
