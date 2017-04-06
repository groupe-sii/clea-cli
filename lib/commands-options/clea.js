const chalk = require('chalk');

const commands = [{
  command: 'new',
  doc: `creates a new directory and runs ${chalk.blue.bold('clea init')} in it`
}, {
  command: 'init',
  doc: `creates a new project in the current folder`
}, {
  command: 'generate',
  doc: 'generates new code from blueprints'
}, {
  command: 'serve',
  doc: 'builds and serves your app, rebuilding on file changes'
}, {
  command: 'build',
  doc: 'builds your app and places it into the output path'
}, {
  command: 'test',
  doc: 'runs your app\'s test suite'
}, {
  command: 'lint',
  doc: 'lints code in existing project'
}, {
  command: 'completion',
  doc: 'command completion script'
}];

module.exports.name = 'clea|help';
module.exports.commands = commands;
