const program = require('commander'),
  chalk = require('chalk'),
  debug = require('debug')('akg-generate'),

  packageFile = require('../package.json'),
  logger = require('../vendors/logger'),
  Project = require('../lib/project'),
  project = Project.getInstance(),
  Blueprints = require('../lib/blueprints/blueprints'),
  Generate = require('../lib/commands/generate');

program
  .version(packageFile.version)
  .arguments('[blueprint] [name]')
  .option('--with-component', `generate a component with the generated module. Only for ${chalk.blue('module')} blueprint.`)
  .option('--lazy-load', `lazy load the module in the parent routing. Only for ${chalk.blue('module')} blueprint.`)
  .action((blueprint, name, options) => {
    project.init().then(() => {
      if (project.akg && project.akg.type === Project.TYPE.LIBRARY) {
        logger.error('ERROR: Generation is disabled in library mode.');

        process.exit(1);
      }

      if (!Blueprints.types.includes(blueprint) && !Blueprints.types.includes(name)) {
        logger.error(`"${blueprint}" blueprint is not allowed. ${chalk.blue.bold('akg help generate')} to see allowed blueprints.`);

        process.exit(1);
      }

      // HACK blueprint & name aren't always well ordered. Don't know why ...
      let tmp = name;
      name = (Blueprints.types.includes(name)) ? blueprint : name;
      blueprint = (Blueprints.types.includes(tmp)) ? tmp : blueprint;

      try {
        Generate.create(blueprint, name, {
          component: options.withComponent,
          lazyLoad : options.lazyLoad
        });
      } catch (err) {
        debug(err);
        logger.error(err.message);

        process.exit(1);
      }
    }, (err) => logger.error(err));
  });

program.on('--help', () => {
  logger.help('  Arguments:');
  logger.help('');
  logger.help(`    [blueprint]    ${Blueprints.types.join(', ')}`);
  logger.help('    [name]         name of the new component');
});

program.parse(process.argv);
