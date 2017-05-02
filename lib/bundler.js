const chalk = require('chalk'),
  path = require('path'),
  fs = require('fs'),

  Project = require('./project'),
  logger = require('../vendors/logger');

class Bundler {

  constructor (type, options) {
    this.project = Project.getInstance();
    this.logger = logger;
    this.type = type;
    this.options = Object.assign({
      name: this.project.clea.name
    }, options);
  }

  start () {
    return this.before()
      .then(() => this.bundle())
      .then(() => this.after());
  }

  getConfig () {
    return this.getWebpackConfigFile(Bundler.COMMON)(this.project, this.options);
  }

  before () {
    return new Promise((resolve, reject) => {
      if (!this.project.isCleaProject()) {
        reject(`You have to be inside a Clea project in order to use the ${chalk.green(this.type)} command.`);
      }

      if (this.project.clea.type === Project.TYPE.APPLICATION) {
        let rootPath = path.join(this.project.root, this.project.clea.root);

        if (this.project.clea.environmentSource === undefined) {
          reject(`${chalk.blue('source')} environment is missing in .clea-cli.json.`);
        }

        if (this.project.clea.environments[this.options.target] === undefined) {
          reject(`Unknown environment ${chalk.blue(this.options.target)}. You can add it in the environments section of the .clea-cli.json file.`);
        }

        if (!fs.existsSync(path.join(rootPath, this.project.clea.environmentSource))) {
          reject(`configuration file ${chalk.blue(this.project.clea.environmentSource)} is missing.`);
        }

        if (!fs.existsSync(path.join(rootPath, this.project.clea.environments[this.options.target]))) {
          reject(`configuration file ${chalk.blue(this.project.clea.environments[this.options.target])} is missing.`);
        }
      }

      resolve();
    });
  }

  bundle () {
    return Promise.resolve();
  }

  after () {
    return Promise.resolve();
  }

  getWebpackConfigFile (file) {
    switch (this.project.clea.type) {
      case Project.TYPE.LIBRARY:
        return require(`./models/webpack-configs-lib/${file}`);

      case Project.TYPE.APPLICATION:
      default:
        return require(`./models/webpack-configs-app/${file}`);
    }
  }

  stats () {
    let options = {
        colors      : true,
        hash        : true,
        timings     : true,
        chunks      : true,
        chunkModules: false,
        children    : false,
        modules     : false,
        reasons     : false,
        warnings    : true,
        assets      : false,
        version     : false
      },
      verboseOptions = {
        children: true,
        assets  : true,
        version : true,
        reasons : true
      };

    return (this.options.verbose) ? Object.assign(options, verboseOptions) : options;
  }

}

Bundler.APPLICATION_WEBPACK_CONFIG = ['common', 'build', 'serve'];
Bundler.LIBRARY_WEBPACK_CONFIG = ['common', 'build'];
Bundler.BUILD = 'build';
Bundler.SERVE = 'serve';
Bundler.COMMON = 'common';

module.exports = Bundler;
