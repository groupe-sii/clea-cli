const chalk = require('chalk'),

  Blueprints = require('../blueprints/blueprints'),
  project = require('./../project').getInstance();

class Generate {

  /**
   * Create a new blueprint
   *
   * @param {Blueprints.types}  blueprint   What do we want to generate ?
   * @param {string}            entityName  Entity name
   * @param {Object}            options     CLI options
   */
  static create (blueprint, entityName, options) {
    if (!project.isCleaProject()) {
      throw new Error(`You have to be inside an project in order to use the ${chalk.green('generate')} command.`);
    }

    if (!Blueprints.types.includes(blueprint)) {
      throw new Error(`Unknown blueprint "${blueprint}".`);
    }

    let blp = new (require(`../blueprints/${blueprint}/index`))(blueprint, entityName, options);

    // Install blueprint
    blp.beforeInstall()
      .then(() => blp.install())
      .then(() => blp.afterInstall());
  }
}

module.exports = Generate;
