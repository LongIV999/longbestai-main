#!/usr/bin/env tsx
/**
 * Build-time Content Bundle Generator
 *
 * Đọc tất cả JSON từ /content directory và tạo static bundle
 * để loại bỏ fs dependencies tại runtime (Cloudflare Pages compatible)
 */

import fs from 'fs';
import path from 'path';
import { postSchema, dealSchema, courseSchema, jobSchema } from '@longbestai/shared';

const CONTENT_ROOT = path.join(process.cwd(), '../../content');
const OUTPUT_DIR = path.join(process.cwd(), 'src/lib/content/.generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'content-bundle.json');

interface ContentBundle {
  posts: unknown[];
  deals: unknown[];
  courses: unknown[];
  jobs: Record<string, unknown>;
}

function readJsonFiles(dir: string): unknown[] {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    return JSON.parse(content);
  });
}

function readJobsWithFilenames(dir: string): Record<string, unknown> {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const jobs: Record<string, unknown> = {};

  files.forEach(file => {
    const filename = file.replace('.json', '');
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    jobs[filename] = JSON.parse(content);
  });

  return jobs;
}

function validateContent(bundle: ContentBundle): void {
  let errors = 0;

  // Validate posts
  bundle.posts.forEach((post, idx) => {
    try {
      postSchema.parse(post);
    } catch (error) {
      console.error(`❌ Post #${idx} validation failed:`, error);
      errors++;
    }
  });

  // Validate deals
  bundle.deals.forEach((deal, idx) => {
    try {
      dealSchema.parse(deal);
    } catch (error) {
      console.error(`❌ Deal #${idx} validation failed:`, error);
      errors++;
    }
  });

  // Validate courses
  bundle.courses.forEach((course, idx) => {
    try {
      courseSchema.parse(course);
    } catch (error) {
      console.error(`❌ Course #${idx} validation failed:`, error);
      errors++;
    }
  });

  // Validate jobs
  Object.entries(bundle.jobs).forEach(([filename, job]) => {
    try {
      jobSchema.parse(job);
    } catch (error) {
      console.error(`❌ Job "${filename}" validation failed:`, error);
      errors++;
    }
  });

  if (errors > 0) {
    throw new Error(`Content validation failed with ${errors} error(s)`);
  }
}

function main() {
  console.log('🚀 Generating content bundle...\n');

  // Read all content
  const bundle: ContentBundle = {
    posts: readJsonFiles(path.join(CONTENT_ROOT, 'posts')),
    deals: readJsonFiles(path.join(CONTENT_ROOT, 'deals')),
    courses: readJsonFiles(path.join(CONTENT_ROOT, 'courses')),
    jobs: readJobsWithFilenames(path.join(CONTENT_ROOT, 'jobs')),
  };

  console.log(`📄 Posts: ${bundle.posts.length}`);
  console.log(`💰 Deals: ${bundle.deals.length}`);
  console.log(`📚 Courses: ${bundle.courses.length}`);
  console.log(`💼 Jobs: ${Object.keys(bundle.jobs).length}\n`);

  // Validate all content against schemas
  console.log('🔍 Validating content with Zod schemas...');
  validateContent(bundle);
  console.log('✅ All content validated successfully\n');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write bundle
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(bundle, null, 2), 'utf-8');

  const stats = fs.statSync(OUTPUT_FILE);
  const sizeKB = (stats.size / 1024).toFixed(2);

  console.log(`✅ Bundle generated: ${OUTPUT_FILE}`);
  console.log(`📦 Bundle size: ${sizeKB} KB\n`);
}

// Execute
try {
  main();
} catch (error) {
  console.error('❌ Bundle generation failed:', error);
  process.exit(1);
}
