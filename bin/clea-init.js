const program = require('commander'),
  chalk = require('chalk'),
  debug = require('debug')('clea-init'),

  packageFile = require('../package.json'),
  Project = require('../lib/project'),
  InitProject = require('../lib/commands/init-project'),
  logger = require('../vendors/logger'),
  { options } = require('../lib/commands-options/clea-init'),
  Command = require('../lib/utilities/command');

program
  .version(packageFile.version)
  .arguments('[project-name]');

Command.addOptions(program, options);

program
  .action((name) => {
    if (!InitProject.UI_FRAMEWORKS.includes(program.uiFramework)) {
      logger.error(`"${program.uiFramework}" ui framework is not allowed. ${chalk.blue.bold('clea help new')} to see allowed types.`);

      process.exit(1);
    }

    try {
      let initProject = new InitProject(name, (program.lib === undefined) ? Project.TYPE.APPLICATION : Project.TYPE.LIBRARY, {
        init             : true,
        verbose          : Boolean(program.verbose),
        uiFramework      : program.uiFramework,
        makeItProgressive: program.makeItProgressive !== undefined,
        skipInstall      : program.skipInstall !== undefined,
        skipGit          : program.skipGit !== undefined,
        commitMessageConventions: program.commitMessageConventions !== undefined
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

program.parse(process.argv);
