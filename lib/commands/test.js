const chalk = require('chalk'),
  path = require('path'),
  KarmaServer = require('karma').Server,
  KarmaConfig = require('karma').config,

  Project = require('../project'),
  logger = require('../../vendors/logger');

class Test {

  constructor (options) {
    this.project = Project.getInstance();
    this.logger = logger;
    this.options = options;
  }

  getConfig () {
    const baseKarmaConfig = require('../models/karma-configs/karma-base.app.conf');

    if (this.options.watch !== undefined) {
      baseKarmaConfig.autoWatch = true;
      baseKarmaConfig.singleRun = false;
    }

    if (this.options.singleRun !== undefined) {
      baseKarmaConfig.autoWatch = false;
      baseKarmaConfig.singleRun = true;
    }

    return KarmaConfig.parseConfig(path.join(this.project.root, this.project.clea.karmaConfig), baseKarmaConfig);
  }

  start () {
    if (!this.project.isCleaProject()) {
      throw new Error(`You have to be inside a Clea project in order to use the ${chalk.green('test')} command.`);
    }

    let server = new KarmaServer(this.getConfig(), (exitCode) => process.exit(exitCode));
    server.start();
  }

}

module.exports = Test;
