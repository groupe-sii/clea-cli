const program = require('commander'),
  debug = require('debug')('clea-lint'),

  packageFile = require('../package.json'),

  project = require('../lib/project').getInstance(),
  Lint = require('../lib/commands/lint'),
  logger = require('../vendors/logger'),
  { options } = require('../lib/commands-options/clea-lint'),
  Command = require('../lib/utilities/command');

program
  .version(packageFile.version);

Command.addOptions(program, options);

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
