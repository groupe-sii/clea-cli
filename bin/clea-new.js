const program = require('commander'),
  chalk = require('chalk'),
  debug = require('debug')('akg-new'),

  packageFile = require('../package.json'),
  InitProject = require('../lib/commands/init-project'),
  logger = require('../vendors/logger');

program
  .version(packageFile.version)
  .arguments('[project-name]')
  .option('-v, --verbose', 'verbose mode')
  .option('--ui-framework [framework]', 'create application with built-in ui framework. "material" or "bootstrap" (defaults to: none)')
  .action((type, name) => {
    if (!InitProject.allowedTypes().includes(type)) {
      logger.error(`"${type}" type is not allowed. ${chalk.blue.bold('akg help new')} to see allowed types.`);

      process.exit(1);
    }

    if (!InitProject.UI_FRAMEWORKS.includes(program.uiFramework)) {
      logger.error(`"${program.uiFramework}" ui framework is not allowed. ${chalk.blue.bold('akg help new')} to see allowed types.`);

      process.exit(1);
    }

    try {

      let initProject = new InitProject(name, type, {
        verbose: Boolean(program.verbose),
        uiFramework: program.uiFramework
      });
      initProject.createFolder();
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
