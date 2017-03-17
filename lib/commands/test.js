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
    return KarmaConfig.parseConfig(path.join(this.project.root, this.project.clea.karmaConfig), {
      port     : this.options.port,
      logLevel : this.options.logLevel,
      autoWatch: this.options.watch,
      singleRun: !this.options.watch
    });
  }

  start () {
    if (!this.project.isCleaProject()) {
      throw new Error(`You have to be inside an project in order to use the ${chalk.green('test')} command.`);
    }

    let server = new KarmaServer(this.getConfig(), (exitCode) => process.exit(exitCode));
    server.start();
  }

}

module.exports = Test;
