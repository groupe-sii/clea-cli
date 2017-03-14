const path = require('path'),
  fs = require('fs'),
  chalk = require('chalk'),
  project = require('../project').getInstance();

class ProgressiveWebApp {

  static getConfig () {
    if (!fs.existsSync(project.clea.swConfig)) {
      throw new Error(`Service Worker configuration file ${chalk.blue(project.clea.swConfig)} does not exist.`);
    }

    return ProgressiveWebApp._parseConfig(require(path.join(project.root, project.clea.swConfig)));
  }

  static _parseConfig (config) {

    // Remove some configuration properties that shouldn't be overrided by the user
    delete config.cacheId;
    delete config.filename;
    delete config.stripPrefix;

    return config;
  }

}

module.exports = ProgressiveWebApp;
