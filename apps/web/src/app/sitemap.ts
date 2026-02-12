import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/content/posts';
import { getAllDeals } from '@/lib/content/deals';
import { getAllCourses } from '@/lib/content/courses';
import { getAllJobFilenames } from '@/lib/content/jobs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://longbestai.com';

  return [
    // Static routes
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/deals`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },

    // Dynamic routes from content
    ...getAllPosts().map(p => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...getAllDeals().map(d => ({
      url: `${baseUrl}/deals/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })),
    ...getAllCourses().map(c => ({
      url: `${baseUrl}/courses/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...getAllJobFilenames().map(filename => ({
      url: `${baseUrl}/jobs/${filename}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })),
  ];
}
