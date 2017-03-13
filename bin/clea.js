#!/usr/bin/env node

const program = require('commander'),
  chalk = require('chalk'),
  SemVer = require('semver').SemVer,

  packageFile = require('../package.json'),
  nodeVersion = new SemVer(process.version),
  logger = require('../vendors/logger');

if (nodeVersion.compare(new SemVer('6.9.0')) < 0) {
  logger.error(`ERROR: Your running version of Node v${nodeVersion.version}, is not a supported version to use the CLI. The official Node supported version is 6.9 and greater.`);

  process.exit(1);
}

program.version(packageFile.version)
  .command('new', `creates a new directory and runs ${chalk.blue.bold('clea init')} in it`)
  .command('init', `creates a new project in the current folder`)
  .command('generate', 'generates new code from blueprints')
  .command('serve', 'builds your app and places it into the output path')
  .command('build', 'builds and serves your app, rebuilding on file changes.')
  .command('test', 'runs your app\'s test suite.')
  .command('lint', 'lints code in existing project.')
  .parse(process.argv);
