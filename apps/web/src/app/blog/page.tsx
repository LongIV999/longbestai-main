import { getAllPosts } from '@/lib/content/posts';
import { PostCard } from '@/components/content/post-card';

export const metadata = {
  title: 'Blog - LongBestAI',
  description: 'Bài viết về AI automation, OpenClaw và các công cụ tự động hóa'
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <p className="text-muted-foreground mb-12 text-lg">
        Khám phá các bài viết về AI automation và công nghệ
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          Chưa có bài viết nào.
        </p>
      )}
    </div>
  );
}
