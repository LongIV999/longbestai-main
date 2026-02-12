import { jobSchema, type Job } from '@longbestai/shared';
import contentBundle from './.generated/content-bundle.json';

let jobsCache: Job[] | null = null;
let filenamesCache: string[] | null = null;

/**
 * Get all jobs, sorted by date descending
 */
export function getAllJobs(): Job[] {
  if (process.env.NODE_ENV === 'production' && jobsCache) {
    return jobsCache;
  }

  // Load from pre-generated bundle and validate
  const jobs = Object.values(contentBundle.jobs).map(j => jobSchema.parse(j));

  jobs.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

  if (process.env.NODE_ENV === 'production') {
    jobsCache = jobs;
  }

  return jobs;
}

/**
 * Get job filename by index (for routing)
 */
export function getJobFilename(index: number): string | null {
  const filenames = getAllJobFilenames();
  return filenames[index] || null;
}

/**
 * Get a single job by filename
 */
export function getJobByFilename(filename: string): Job | null {
  const jobData = (contentBundle.jobs as Record<string, unknown>)[filename];

  if (!jobData) {
    return null;
  }

  return jobSchema.parse(jobData);
}

/**
 * Get all job filenames (for generateStaticParams)
 */
export function getAllJobFilenames(): string[] {
  if (process.env.NODE_ENV === 'production' && filenamesCache) {
    return filenamesCache;
  }

  const filenames = Object.keys(contentBundle.jobs).sort();

  if (process.env.NODE_ENV === 'production') {
    filenamesCache = filenames;
  }

  return filenames;
}
