#!/usr/bin/env tsx

import { Command } from 'commander';
import { validateCommand } from '../src/commands/validate.js';
import { makeCommand } from '../src/commands/make.js';
import { exportCardCommand } from '../src/commands/export-card.js';

const program = new Command();

program
  .name('content-ops')
  .description('LongBestAI Content Operations CLI')
  .version('0.1.0');

program
  .command('validate')
  .description('Validate all JSON content files against schemas')
  .action(validateCommand);

program
  .command('make')
  .description('Create new content interactively')
  .argument('[type]', 'Content type: post, deal, course, job')
  .action(makeCommand);

program
  .command('export-card')
  .description('Export job cards to social_card_to_image format')
  .action(exportCardCommand);

program.parse();
