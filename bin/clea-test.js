const program = require('commander'),
  debug = require('debug')('akg-test'),

  packageFile = require('../package.json'),
  project = require('../lib/project').getInstance(),
  Test = require('../lib/commands/test'),
  logger = require('../vendors/logger');

program
  .version(packageFile.version)
  .option('--log-level [level]', 'level of logging (defaults to: info)', 'info')
  .option('--port [port]', 'port where the web server will be listening (defaults to: 9876)', 9876);

program.parse(process.argv);

project.init().then(() => {
  let test = new Test({
    logLevel: program.logLevel,
    port    : program.port
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
