import fs from 'fs';
import path from 'path';
import * as clack from '@clack/prompts';
import { courseSchema, generateSlug } from '@longbestai/shared';

const COURSES_DIR = path.join(process.cwd(), 'content/courses');

export async function makeCourse() {
  // Ensure directory exists
  if (!fs.existsSync(COURSES_DIR)) {
    fs.mkdirSync(COURSES_DIR, { recursive: true });
  }

  const title = await clack.text({
    message: 'Course title:',
    placeholder: 'OpenClaw Basics',
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
    message: 'Slug:',
    placeholder: autoSlug,
    initialValue: autoSlug
  });

  if (clack.isCancel(slug)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const level = await clack.select({
    message: 'Course level:',
    options: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' }
    ]
  });

  if (clack.isCancel(level)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  // Learning outcomes
  const outcomeInput = await clack.text({
    message: 'Learning outcomes (comma-separated, min 1):',
    placeholder: 'Hiểu kiến trúc, Tạo workflow, Tích hợp, Debug',
    validate: (value) => {
      if (!value || value.length === 0) return 'At least one outcome is required';
    }
  });

  if (clack.isCancel(outcomeInput)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const outcome = outcomeInput.split(',').map(o => o.trim()).filter(o => o.length > 0);

  // Lessons (min 4)
  const lessons: Array<{ title: string; summary: string }> = [];

  clack.note('Add lessons (minimum 4 required)');

  for (let i = 0; i < 4; i++) {
    const lessonTitle = await clack.text({
      message: `Lesson ${i + 1} title:`,
      placeholder: 'Giới thiệu OpenClaw'
    });

    if (clack.isCancel(lessonTitle)) {
      clack.cancel('Operation cancelled.');
      process.exit(0);
    }

    const lessonSummary = await clack.text({
      message: `Lesson ${i + 1} summary:`,
      placeholder: 'Tìm hiểu kiến trúc và các khái niệm cơ bản'
    });

    if (clack.isCancel(lessonSummary)) {
      clack.cancel('Operation cancelled.');
      process.exit(0);
    }

    lessons.push({ title: lessonTitle, summary: lessonSummary });
  }

  // Ask if user wants to add more lessons
  let addMore = true;
  while (addMore) {
    const more = await clack.confirm({
      message: 'Add another lesson?'
    });

    if (clack.isCancel(more) || !more) {
      addMore = false;
      break;
    }

    const lessonTitle = await clack.text({
      message: `Lesson ${lessons.length + 1} title:`,
      placeholder: 'Advanced topics'
    });

    if (clack.isCancel(lessonTitle)) break;

    const lessonSummary = await clack.text({
      message: `Lesson ${lessons.length + 1} summary:`,
      placeholder: 'Deep dive into advanced features'
    });

    if (clack.isCancel(lessonSummary)) break;

    lessons.push({ title: lessonTitle, summary: lessonSummary });
  }

  const priceInput = await clack.text({
    message: 'Price (optional):',
    placeholder: '2000000 or "Free"',
    required: false
  });

  if (clack.isCancel(priceInput)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const course = courseSchema.parse({
    slug,
    title,
    level,
    outcome,
    lessons,
    ...(priceInput && { price: isNaN(Number(priceInput)) ? priceInput : Number(priceInput) })
  });

  const filePath = path.join(COURSES_DIR, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(course, null, 2));

  clack.note(`File saved: ${path.relative(process.cwd(), filePath)}`);
}
