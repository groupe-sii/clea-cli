const program = require('commander'),
  chalk = require('chalk'),
  debug = require('debug')('akg-init'),

  packageFile = require('../package.json'),
  project = require('../lib/project').getInstance(),
  InitProject = require('../lib/commands/init-project'),
  logger = require('../vendors/logger');

program
  .version(packageFile.version)
  .arguments('[project-name]')
  .option('-v, --verbose', 'verbose mode')
  .option('--ui-framework [framework]', 'create application with built-in ui framework. "material" or "bootstrap" (defaults to: none)')
  .option('--lib', 'generate a library instead of an application')
  .action((name) => {
    if (!InitProject.UI_FRAMEWORKS.includes(program.uiFramework)) {
      logger.error(`"${program.uiFramework}" ui framework is not allowed. ${chalk.blue.bold('akg help new')} to see allowed types.`);

      process.exit(1);
    }

    try {
      let initProject = new InitProject(name, (program.lib === undefined) ? InitProject.APPLICATION : InitProject.LIBRARY, {
        init       : true,
        verbose    : Boolean(program.verbose),
        uiFramework: program.uiFramework
      });
      initProject.start().catch((err) => {
        debug(err);
        logger.error(err);

        process.exit(1);
      });
    } catch (err) {
      debug(err);
      logger.error(err.message);

      process.exit(1);
    }
  });

program.on('--help', () => {
  logger.help('  Arguments:');
  logger.help('');
  logger.help('    [type]           type of the project to generate.');
  logger.help('                       For an application: application, app');
  logger.help('                       For a library: library, lib');
  logger.help('    [project-name]   project name');
  logger.help('');
});

program.parse(process.argv);
