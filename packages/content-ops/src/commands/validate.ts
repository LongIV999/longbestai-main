import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import { postSchema, dealSchema, courseSchema, jobSchema } from '@longbestai/shared';

interface ValidationResult {
  file: string;
  type: string;
  valid: boolean;
  errors?: string[];
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

const SCHEMA_MAP = {
  posts: postSchema,
  deals: dealSchema,
  courses: courseSchema,
  jobs: jobSchema
} as const;

export async function validateCommand() {
  console.log(pc.cyan('\n🔍 Validating content files...\n'));

  const results: ValidationResult[] = [];
  let totalFiles = 0;
  let validFiles = 0;

  // Scan each content type directory
  for (const [type, schema] of Object.entries(SCHEMA_MAP)) {
    const dir = path.join(CONTENT_DIR, type);

    if (!fs.existsSync(dir)) {
      console.log(pc.yellow(`⚠️  Directory not found: ${type}/`));
      continue;
    }

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      totalFiles++;
      const filePath = path.join(dir, file);
      const relativePath = path.relative(process.cwd(), filePath);

      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        schema.parse(content);

        results.push({ file: relativePath, type, valid: true });
        validFiles++;
        console.log(pc.green(`✓ ${relativePath}`));
      } catch (error: any) {
        const errors = error.errors?.map((e: any) =>
          `${e.path.join('.')}: ${e.message}`
        ) || [error.message];

        results.push({ file: relativePath, type, valid: false, errors });
        console.log(pc.red(`✗ ${relativePath}`));
        errors.forEach((err: string) => console.log(pc.red(`  ${err}`)));
      }
    }
  }

  // Summary
  console.log(pc.cyan('\n📊 Summary:'));
  console.log(`Total files: ${totalFiles}`);
  console.log(pc.green(`Valid: ${validFiles}`));
  console.log(pc.red(`Invalid: ${totalFiles - validFiles}`));

  if (totalFiles === validFiles) {
    console.log(pc.green('\n✅ All content files are valid!\n'));
    process.exit(0);
  } else {
    console.log(pc.red('\n❌ Some files have validation errors.\n'));
    process.exit(1);
  }
}
