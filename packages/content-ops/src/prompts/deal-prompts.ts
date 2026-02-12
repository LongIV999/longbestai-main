import fs from 'fs';
import path from 'path';
import * as clack from '@clack/prompts';
import { dealSchema, generateSlug, normalizeTags } from '@longbestai/shared';

const DEALS_DIR = path.join(process.cwd(), 'content/deals');

export async function makeDeal() {
  // Ensure directory exists
  if (!fs.existsSync(DEALS_DIR)) {
    fs.mkdirSync(DEALS_DIR, { recursive: true });
  }

  const title = await clack.text({
    message: 'Deal title:',
    placeholder: 'OpenClaw Setup Package',
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

  const hasItems = await clack.confirm({
    message: 'Does this deal have multiple tiers/items?'
  });

  if (clack.isCancel(hasItems)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  let price: string | number;
  let items: any[] | undefined;

  if (hasItems) {
    price = 'Liên hệ';
    items = [];

    let addMore = true;
    while (addMore) {
      const itemTitle = await clack.text({
        message: 'Item title:',
        placeholder: 'OpenClaw Lite'
      });

      if (clack.isCancel(itemTitle)) break;

      const cost = await clack.text({
        message: 'Cost (optional):',
        placeholder: '3500000',
        required: false
      });

      if (clack.isCancel(cost)) break;

      const retail = await clack.text({
        message: 'Retail price (optional):',
        placeholder: '5000000',
        required: false
      });

      if (clack.isCancel(retail)) break;

      const duration = await clack.text({
        message: 'Duration (optional):',
        placeholder: '1 tháng',
        required: false
      });

      if (clack.isCancel(duration)) break;

      const itemNotes = await clack.text({
        message: 'Item notes (optional):',
        placeholder: 'Chỉ dùng export video...',
        required: false
      });

      if (clack.isCancel(itemNotes)) break;

      items.push({
        title: itemTitle,
        ...(cost && { cost: isNaN(Number(cost)) ? cost : Number(cost) }),
        ...(retail && { retail: isNaN(Number(retail)) ? retail : Number(retail) }),
        ...(duration && { duration }),
        ...(itemNotes && { notes: itemNotes })
      });

      const more = await clack.confirm({
        message: 'Add another item?'
      });

      if (clack.isCancel(more) || !more) {
        addMore = false;
      }
    }
  } else {
    const priceInput = await clack.text({
      message: 'Price:',
      placeholder: '5000000 or "Liên hệ"'
    });

    if (clack.isCancel(priceInput)) {
      clack.cancel('Operation cancelled.');
      process.exit(0);
    }

    price = isNaN(Number(priceInput)) ? priceInput : Number(priceInput);
  }

  const tagsInput = await clack.text({
    message: 'Tags (comma-separated):',
    placeholder: 'openclaw, setup, automation'
  });

  if (clack.isCancel(tagsInput)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const notes = await clack.text({
    message: 'Notes (optional):',
    placeholder: 'SLA 99.5%, Overage 500k/1000 requests',
    required: false
  });

  if (clack.isCancel(notes)) {
    clack.cancel('Operation cancelled.');
    process.exit(0);
  }

  const tags = normalizeTags(tagsInput.split(',').map(t => t.trim()));

  const deal = dealSchema.parse({
    slug,
    title,
    price,
    tags,
    ...(items && items.length > 0 && { items }),
    ...(notes && { notes })
  });

  const filePath = path.join(DEALS_DIR, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(deal, null, 2));

  clack.note(`File saved: ${path.relative(process.cwd(), filePath)}`);
}
