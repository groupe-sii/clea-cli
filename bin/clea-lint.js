const program = require('commander'),
  debug = require('debug')('akg-lint'),
  chalk = require('chalk'),

  packageFile = require('../package.json'),

  project = require('../lib/project').getInstance(),
  Lint = require('../lib/commands/lint'),
  logger = require('../vendors/logger');

program
  .version(packageFile.version)
  .option('--fix', 'will attempt to fix lint errors')
  .option('--force', 'will always return error code 0 even with lint errors. It also launches all linters, whether there is errors or not.');

program.parse(process.argv);

project.init().then(() => {
  let lint = new Lint({
    fix  : program.fix !== undefined,
    force: program.force !== undefined
  });

  lint.start()
    .catch((err) => {
      debug(err);
      if (err !== undefined) {
        logger.error(err || err.message);
      }

      process.exit(1);
    });
}, (err) => {
  debug(err);
  logger.error(err.message);

  process.exit(1);
});
