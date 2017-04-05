#!/usr/bin/env node
/* eslint-disable no-console */

const program = require('commander'),
  packageFile = require('../package.json'),
  Completion = require('../lib/commands/completion');

program
  .version(packageFile.version)
  .option('-z, --zsh', 'generate zsh config')
  .option('-b, --bash', 'generate bash config')
program.parse(process.argv);

new Completion(program.bash && 'bash');
