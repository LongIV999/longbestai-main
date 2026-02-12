import fs from 'fs';
import path from 'path';
import * as clack from '@clack/prompts';
import { postSchema, generateSlug, normalizeTags } from '@longbestai/shared';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export async function makePost() {
  // Ensure directory exists
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  // Collect post data
  const title = await clack.text({
    message: 'Post title:',
    placeholder: 'Giới thiệu OpenClaw',
    validate: (value) => {
      if (!value || value.length === 0) return 'Title is required';
      if (value.length > 200) return 'Title must be under 200 characters';
    }
  });

  if (clack.isCancel(title)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const autoSlug = generateSlug(title);
  const slug = await clack.text({
    message: 'Slug (URL-friendly):',
    placeholder: autoSlug,
    initialValue: autoSlug,
    validate: (value) => {
      if (!value || value.length === 0) return 'Slug is required';
      if (!/^[a-z0-9-]+$/.test(value)) return 'Slug must be lowercase, alphanumeric + hyphens only';
    }
  });

  if (clack.isCancel(slug)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const excerpt = await clack.text({
    message: 'Excerpt (short summary):',
    placeholder: 'Platform tự động hóa AI...',
    validate: (value) => {
      if (!value || value.length === 0) return 'Excerpt is required';
      if (value.length > 500) return 'Excerpt must be under 500 characters';
    }
  });

  if (clack.isCancel(excerpt)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const tagsInput = await clack.text({
    message: 'Tags (comma-separated):',
    placeholder: 'openclaw, ai, automation',
    validate: (value) => {
      if (!value || value.length === 0) return 'At least one tag is required';
    }
  });

  if (clack.isCancel(tagsInput)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const body = await clack.text({
    message: 'Body (full content):',
    placeholder: 'Enter full post content...'
  });

  if (clack.isCancel(body)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const visualsInput = await clack.text({
    message: 'Suggested visuals (optional, comma-separated):',
    placeholder: 'screenshot-1.png, diagram.svg',
    required: false
  });

  if (clack.isCancel(visualsInput)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  // Parse tags
  const tags = normalizeTags(tagsInput.split(',').map(t => t.trim()));

  // Parse visuals
  const suggestedVisuals = visualsInput && visualsInput.length > 0
    ? visualsInput.split(',').map(v => v.trim()).filter(v => v.length > 0)
    : undefined;

  // Validate with schema
  const post = postSchema.parse({
    slug,
    title,
    excerpt,
    tags,
    body,
    suggestedVisuals
  });

  // Write to file
  const filePath = path.join(POSTS_DIR, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2));

  clack.note(`File saved: ${path.relative(process.cwd(), filePath)}`);
}
