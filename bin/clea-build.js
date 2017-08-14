const program = require('commander'),
  debug = require('debug')('clea-build'),

  packageFile = require('../package.json'),
  project = require('../lib/project').getInstance(),
  Build = require('../lib/commands/build'),
  logger = require('../vendors/logger'),
  { options } = require('../lib/commands-options/clea-build'),
  Command = require('../lib/utilities/command');

program.version(packageFile.version);
Command.addOptions(program, options);
program.parse(process.argv);

project.init().then(() => {
  let build = new Build({
    verbose       : program.verbose !== undefined,
    target        : program.target || 'development',
    outputPath    : program.outputPath || 'dist/',
    baseHref      : program.baseHref,
    compress      : program.compress !== undefined,
    sourcemap     : program.sourcemap !== undefined,
    progress      : program.progress !== undefined,
    mergeConfig   : program.mergeConfig,
    overrideConfig: program.overrideConfig,
    enableDoc     : program.doc !== undefined
  });

  build.start().catch((err) => {
    debug(err);
    logger.error(err.message || err);

    process.exit(1);
  });
}, (err) => {
  debug(err);
  logger.error(err.message);

  process.exit(1);
});
