import fs from 'fs';
import path from 'path';
import { jobSchema, type Job } from '@longbestai/shared';

const JOBS_DIR = path.join(process.cwd(), '../../content/jobs');
let jobsCache: Job[] | null = null;

/**
 * Get all jobs, sorted by date descending
 */
export function getAllJobs(): Job[] {
  if (process.env.NODE_ENV === 'production' && jobsCache) {
    return jobsCache;
  }

  const files = fs.readdirSync(JOBS_DIR).filter(f => f.endsWith('.json'));
  const jobs = files.map(file => {
    const content = JSON.parse(fs.readFileSync(path.join(JOBS_DIR, file), 'utf-8'));
    return jobSchema.parse(content);
  });

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
  const files = fs.readdirSync(JOBS_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();

  return files[index]?.replace('.json', '') || null;
}

/**
 * Get a single job by filename
 */
export function getJobByFilename(filename: string): Job | null {
  const filePath = path.join(JOBS_DIR, `${filename}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return jobSchema.parse(content);
}

/**
 * Get all job filenames (for generateStaticParams)
 */
export function getAllJobFilenames(): string[] {
  return fs.readdirSync(JOBS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''));
}
