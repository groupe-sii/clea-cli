const path = require('path'),
  fs = require('fs'),
  webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),

  Project = require('../project'),
  Bundler = require('../bundler'),
  ProgressiveWebApp = require('../utilities/progressive-web-app');

class Build extends Bundler {

  constructor (options) {
    super('build', options);
  }

  getConfig () {
    let swConfig = null;

    if (this.project.clea.swConfig !== undefined) {
      swConfig = ProgressiveWebApp.getConfig();
    }

    let webpackBuild = this.getWebpackConfigFile(Bundler.BUILD);
    let config = webpackMerge(super.getConfig(), webpackBuild(this.project, this.options, swConfig));

    if (this.options.mergeConfig && fs.existsSync(this.options.mergeConfig)) {
      config = webpackMerge(require(path.resolve(this.options.mergeConfig)), config);
    }

    if (this.options.overrideConfig && fs.existsSync(this.options.overrideConfig)) {
      config = require(path.resolve(this.options.overrideConfig));
    }

    return config;
  }

  bundle () {
    return new Promise((resolve, reject) => {
      if (this.project.clea && this.project.clea.type === Project.TYPE.LIBRARY && this.options.target) {
        this.logger.warning('WARNING: --target option is not available for library projects');
      }

      if (this.project.clea.type === Project.TYPE.LIBRARY && this.options.outputPath) {
        this.logger.warning('WARNING: --output-path (./lib) option is not available for library projects');
      }

      let compiler = webpack(this.getConfig());

      // After the build is complete
      compiler.run((err, stats) => {
        if (err) {
          reject(err);
        }

        this.logger.pop(stats.toString(this.stats()));

        resolve();
      });
    });
  }

}

module.exports = Build;
