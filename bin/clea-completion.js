#!/usr/bin/env node

const program = require('commander'),
  packageFile = require('../package.json'),
  Completion = require('../lib/commands/completion'),
  { options } = require('../lib/commands-options/clea-completion'),
  Command = require('../lib/utilities/command');

program.version(packageFile.version);

Command.addOptions(program, options);

program.parse(process.argv);

const completion = new Completion(program.zsh && 'zsh');

console.log(`${completion.show()}`); // eslint-disable-line no-console
