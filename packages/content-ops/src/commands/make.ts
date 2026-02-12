import * as clack from '@clack/prompts';
import pc from 'picocolors';
import { makePost } from '../prompts/post-prompts.js';
import { makeDeal } from '../prompts/deal-prompts.js';
import { makeCourse } from '../prompts/course-prompts.js';
import { makeJob } from '../prompts/job-prompts.js';

export async function makeCommand(type?: string) {
  clack.intro(pc.cyan('📝 Create New Content'));

  // If type not provided, ask user
  if (!type) {
    const result = await clack.select({
      message: 'What type of content do you want to create?',
      options: [
        { value: 'post', label: 'Blog Post' },
        { value: 'deal', label: 'Deal/Pricing' },
        { value: 'course', label: 'Course' },
        { value: 'job', label: 'Job Card' }
      ]
    });

    if (clack.isCancel(result)) {
      clack.cancel('Operation cancelled.');
      process.exit(0);
    }

    type = result as string;
  }

  // Route to appropriate prompt handler
  try {
    switch (type) {
      case 'post':
        await makePost();
        break;
      case 'deal':
        await makeDeal();
        break;
      case 'course':
        await makeCourse();
        break;
      case 'job':
        await makeJob();
        break;
      default:
        clack.cancel(`Unknown content type: ${type}`);
        process.exit(1);
    }

    clack.outro(pc.green('✅ Content created successfully!'));
  } catch (error: any) {
    clack.cancel(pc.red(`Error: ${error.message}`));
    process.exit(1);
  }
}
