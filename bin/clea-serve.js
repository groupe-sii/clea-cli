const program = require('commander'),
  debug = require('debug')('clea-serve'),

  packageFile = require('../package.json'),
  Project = require('../lib/project'),
  project = Project.getInstance(),
  Serve = require('../lib/commands/serve'),
  logger = require('../vendors/logger'),
  { options } = require('../lib/commands-options/clea-serve'),
  Command = require('../lib/utilities/command');

program
  .version(packageFile.version);

Command.addOptions(program, options);

program.parse(process.argv);

project.init().then(() => {
  if (project.clea && project.clea.type === Project.TYPE.LIBRARY) {
    logger.error('ERROR: A library project cannot be served.');

    process.exit(1);
  }

  let serve = new Serve({
    verbose        : program.verbose !== undefined,
    target         : program.target,
    host           : program.host,
    port           : program.port,
    baseHref       : program.baseHref,
    https          : program.https !== undefined,
    progress       : program.progress !== undefined,
    api            : program.api === true ? 'db.json' : program.api,
    apiCustomRoutes: program.apiCustomRoutes,
    proxyConfig    : program.proxyConfig,
    mergeConfig    : program.mergeConfig,
    overrideConfig : program.overrideConfig
  });

  serve.start().catch((err) => {
    debug(err);
    logger.error(err.message || err);

    process.exit(1);
  });
}, (err) => {
  debug(err);
  logger.error(err.message);

  process.exit(1);
});
