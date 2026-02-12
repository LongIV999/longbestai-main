import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import { jobSchema } from '@longbestai/shared';

const JOBS_DIR = path.join(process.cwd(), 'content/jobs');
const EXPORT_DIR = path.join(process.cwd(), 'exports/cards');

export async function exportCardCommand() {
  console.log(pc.cyan('\n🎨 Exporting job cards...\n'));

  // Ensure export directory exists
  if (!fs.existsSync(EXPORT_DIR)) {
    fs.mkdirSync(EXPORT_DIR, { recursive: true });
  }

  // Read all job files
  if (!fs.existsSync(JOBS_DIR)) {
    console.log(pc.yellow('⚠️  No jobs directory found.'));
    process.exit(0);
  }

  const files = fs.readdirSync(JOBS_DIR).filter(f => f.endsWith('.json'));
  let exported = 0;

  for (const file of files) {
    const filePath = path.join(JOBS_DIR, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    try {
      // Validate job schema
      const job = jobSchema.parse(content);

      // Extract only card-compatible fields
      const cardData = {
        meta: job.meta,
        caption: job.caption,
        render: job.render,
        overlay: job.overlay
      };

      // Write to exports/cards/
      const exportPath = path.join(EXPORT_DIR, file);
      fs.writeFileSync(exportPath, JSON.stringify(cardData, null, 2));

      console.log(pc.green(`✓ Exported: ${file}`));
      exported++;
    } catch (error: any) {
      console.log(pc.red(`✗ Failed to export ${file}: ${error.message}`));
    }
  }

  console.log(pc.cyan(`\n📊 Exported ${exported} job card(s) to ${EXPORT_DIR}\n`));
}
