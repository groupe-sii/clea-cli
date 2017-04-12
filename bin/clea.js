#!/usr/bin/env node

const program = require('commander'),
  SemVer = require('semver').SemVer,
  nodeVersion = new SemVer(process.version),
  logger = require('../vendors/logger'),
  packageFile = require('../package.json'),
  { commands } = require('../lib/commands-options/clea'),
  Command = require('../lib/utilities/command');

if (nodeVersion.compare(new SemVer('6.9.0')) < 0) {
  logger.error(`ERROR: Your running version of Node v${nodeVersion.version}, is not a supported version to use the CLI. The official Node supported version is 6.9 and greater.`);

  process.exit(1);
}

program.version(packageFile.version);
Command.addCommands(program, commands);
program.parse(process.argv);
