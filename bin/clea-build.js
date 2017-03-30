const program = require('commander'),
  debug = require('debug')('clea-build'),

  packageFile = require('../package.json'),
  project = require('../lib/project').getInstance(),
  Build = require('../lib/commands/build'),
  logger = require('../vendors/logger');

program
  .version(packageFile.version)
  .option('-v, --verbose', 'verbose mode')
  .option('--target [env]', 'build the application with the targeted environment (defaults to: development)')
  .option('--output-path [path]', 'build the application into this path (defaults to: dist/)')
  .option('--base-href [url]', 'base url for the application being built (defaults to: /)', '/')
  .option('--compress', 'enable gzip compression')
  .option('--sourcemap', 'output sourcemaps')
  .option('--doc', 'generate the documentation')
  .option('--progress', 'display a compilation progress')
  .option('--merge-config [config]', 'merge the given webpack configuration with the existing one')
  .option('--override-config [config]', 'override the existing webpack configuration by the given one');

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
