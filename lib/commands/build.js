const path = require('path'),
  fs = require('fs'),
  webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),

  Bundler = require('../bundler');

class Build extends Bundler {

  getConfig () {
    let webpackBuild = this.getWebpackConfigFile(Bundler.BUILD);
    let config = webpackMerge(super.getConfig(), webpackBuild(this.project, this.options));

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
      let compiler = webpack(this.getConfig());

      // Progress bar
      if (this.options.progress) {
        compiler.apply(this.progress());
      }

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
