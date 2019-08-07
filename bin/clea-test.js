const program = require('commander'),
  debug = require('debug')('clea-test'),

  packageFile = require('../package.json'),
  project = require('../lib/project').getInstance(),
  Test = require('../lib/commands/test'),
  logger = require('../vendors/logger'),
  { options } = require('../lib/commands-options/clea-test'),
  Command = require('../lib/utilities/command');

program
  .version(packageFile.version);

Command.addOptions(program, options);

program.parse(process.argv);

project.init().then(() => {
  let test = new Test({
    browsers    : program.browsers,
    singleRun: program.singleRun
    watch       : program.watch,
    singleRun   : program.singleRun
  });

  try {
    test.start();
  } catch (err) {
    debug(err);
    logger.error(err.message || err);

    process.exit(1);
  }
}, (err) => {
  debug(err);
  logger.error(err.message);

  process.exit(1);
});
