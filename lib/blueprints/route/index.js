const chalk = require('chalk'),

  Blueprints = require('../blueprints'),
  logger = require('../../../vendors/logger');

class RouteBlueprint extends Blueprints {

  constructor (blueprint, entityName, options) {
    super(blueprint, entityName, options);

    this.type = 'route';
    this.files = [
      '__name__.routing.ts'
    ];
  }

  afterInstall () {
    return new Promise((resolve) => {
      logger.pop(`  ${chalk.yellow('WARNING')} Route is generated but not registered, it must be registered to be used`);

      resolve();
    });
  }

}

module.exports = RouteBlueprint;
