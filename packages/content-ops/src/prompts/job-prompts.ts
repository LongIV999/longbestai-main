import fs from 'fs';
import path from 'path';
import * as clack from '@clack/prompts';
import { jobSchema, generateSlug } from '@longbestai/shared';
import pc from 'picocolors';

const JOBS_DIR = path.join(process.cwd(), 'content/jobs');

export async function makeJob() {
  // Ensure directory exists
  if (!fs.existsSync(JOBS_DIR)) {
    fs.mkdirSync(JOBS_DIR, { recursive: true });
  }

  clack.note(pc.yellow('⚠️  Caption must be PLAIN TEXT only (no markdown headings like "# ")'));

  const brand = await clack.text({
    message: 'Brand name:',
    placeholder: 'LongBestAI',
    initialValue: 'LongBestAI'
  });

  if (clack.isCancel(brand)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const caption = await clack.text({
    message: 'Caption (plain text, include Zalo + group link):',
    placeholder: 'TUYỂN DỤNG AI Specialist... Zalo 0903 469 888...',
    validate: (value) => {
      if (!value || value.length === 0) return 'Caption is required';
      if (value.startsWith('# ') || value.includes('\n# ')) {
        return 'Caption must be PLAIN TEXT (no markdown headings)';
      }
    }
  });

  if (clack.isCancel(caption)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const preset = await clack.text({
    message: 'Render preset:',
    placeholder: 'job-card-v1',
    initialValue: 'job-card-v1'
  });

  if (clack.isCancel(preset)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const theme = await clack.text({
    message: 'Theme:',
    placeholder: 'bridge-brutal',
    initialValue: 'bridge-brutal'
  });

  if (clack.isCancel(theme)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const background = await clack.text({
    message: 'Background color (optional):',
    placeholder: '#00F0F0',
    required: false
  });

  if (clack.isCancel(background)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  // Build overlay items
  const overlay: any[] = [];

  clack.note('Add overlay items (stickers, arrows, highlights, icons)');

  let addMore = true;
  while (addMore && overlay.length < 10) {
    const overlayType = await clack.select({
      message: `Add overlay item (${overlay.length}/10):`,
      options: [
        { value: 'stickerRect', label: 'Sticker Rectangle' },
        { value: 'arrow', label: 'Arrow' },
        { value: 'highlightScribble', label: 'Highlight Scribble' },
        { value: 'icon', label: 'Icon' },
        { value: 'done', label: '✓ Done adding overlays' }
      ]
    });

    if (clack.isCancel(overlayType) || overlayType === 'done') {
      addMore = false;
      break;
    }

    if (overlayType === 'stickerRect') {
      const text = await clack.text({ message: 'Sticker text:', placeholder: 'TUYỂN DỤNG' });
      if (clack.isCancel(text)) break;

      const x = Number(await clack.text({ message: 'X position:', placeholder: '100' }));
      const y = Number(await clack.text({ message: 'Y position:', placeholder: '50' }));
      const width = Number(await clack.text({ message: 'Width:', placeholder: '200' }));
      const height = Number(await clack.text({ message: 'Height:', placeholder: '60' }));

      overlay.push({ type: 'stickerRect', x, y, width, height, text });
    } else if (overlayType === 'arrow') {
      const x1 = Number(await clack.text({ message: 'Start X:', placeholder: '100' }));
      const y1 = Number(await clack.text({ message: 'Start Y:', placeholder: '100' }));
      const x2 = Number(await clack.text({ message: 'End X:', placeholder: '200' }));
      const y2 = Number(await clack.text({ message: 'End Y:', placeholder: '200' }));

      overlay.push({ type: 'arrow', x1, y1, x2, y2 });
    } else if (overlayType === 'highlightScribble') {
      const x = Number(await clack.text({ message: 'X position:', placeholder: '50' }));
      const y = Number(await clack.text({ message: 'Y position:', placeholder: '150' }));
      const width = Number(await clack.text({ message: 'Width:', placeholder: '300' }));
      const height = Number(await clack.text({ message: 'Height:', placeholder: '40' }));

      overlay.push({ type: 'highlightScribble', x, y, width, height, color: '#B6FF00' });
    } else if (overlayType === 'icon') {
      const iconName = await clack.text({ message: 'Icon name:', placeholder: 'star' });
      const x = Number(await clack.text({ message: 'X position:', placeholder: '300' }));
      const y = Number(await clack.text({ message: 'Y position:', placeholder: '50' }));

      if (clack.isCancel(iconName)) break;
      overlay.push({ type: 'icon', x, y, iconName });
    }
  }

  // Auto-generate slug from brand + timestamp
  const autoSlug = generateSlug(`${brand}-job-${Date.now()}`);
  const slug = await clack.text({
    message: 'Filename (without .json):',
    placeholder: autoSlug,
    initialValue: autoSlug
  });

  if (clack.isCancel(slug)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const job = jobSchema.parse({
    meta: {
      brand,
      date: new Date().toISOString(),
      content_type: 'job'
    },
    caption,
    render: {
      preset,
      theme,
      ...(background && { card: { background } })
    },
    overlay
  });

  const filePath = path.join(JOBS_DIR, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(job, null, 2));

  clack.note(`File saved: ${path.relative(process.cwd(), filePath)}`);
}
