const program = require('commander'),
  debug = require('debug')('clea-serve'),

  packageFile = require('../package.json'),
  Project = require('../lib/project'),
  project = Project.getInstance(),
  Serve = require('../lib/commands/serve'),
  logger = require('../vendors/logger');

program
  .version(packageFile.version)
  .option('-v, --verbose', 'verbose mode')
  .option('--target [env]', 'build the application with the targeted environment (defaults to: development)', 'development')
  .option('--host [host]', 'host to listen to (defaults to: localhost)', 'localhost')
  .option('--port [port]', 'the port to serve the application (defaults to: 8080)', '8080')
  .option('--base-href [url]', 'base url for the application being built (defaults to: /)', '/')
  .option('--https', 'flag to turn on HTTPS')
  .option('--progress', 'display a compilation progress (defaults to: false)')
  .option('--api [db]', 'enable the mock API on the specified database JSON file (defaults to: db.json)')
  .option('--api-custom-routes [config]', 'add custom Express routes (defaults to: api.conf.js)', 'api.conf.js')
  .option('--proxy-config [config]', 'proxy configuration file')
  .option('--merge-config [config]', 'merge the given webpack configuration with the existing one')
  .option('--override-config [config]', 'override the existing webpack configuration by the given one');

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
