const path = require('path'),
  fs = require('fs'),
  chalk = require('chalk'),
  webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  WebpackDevServer = require('webpack-dev-server'),
  jsonServer = require('json-server'),

  Bundler = require('../bundler');

class Serve extends Bundler {

  getConfig () {
    let webpackServe = this.getWebpackConfigFile(Bundler.SERVE);
    let config = webpackMerge(super.getConfig(), webpackServe(this.project, this.options));

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
      let webpackConfiguration = this.getConfig();

      webpackConfiguration.entry.main.unshift(`webpack-dev-server/client?http://${this.options.host}:${this.options.port}/`, 'webpack/hot/dev-server');

      let compiler = webpack(webpackConfiguration);

      // Progress bar
      if (this.options.progress) {
        compiler.apply(this.progress());
      }

      let webpackDevServerConfiguration = {
        contentBase       : path.join(this.project.root, this.project.clea.root, 'public'),
        hot               : true,
        historyApiFallback: true,
        inline            : true,
        https             : this.options.https,
        stats             : this.stats()
      };

      // Proxy
      if (this.options.proxyConfig !== undefined) {
        let proxyPath = path.resolve(this.project.root, this.options.proxyConfig);

        if (!fs.existsSync(proxyPath)) {
          reject(`Proxy config file ${chalk.blue(proxyPath)} does not exist.`);
        }

        let proxyConfig = require(proxyPath);

        // /api already used by JSON Server
        if (this.options.api !== undefined && Object.keys(proxyConfig).includes('/api')) {
          this.logger.warning(`WARNING: The ${chalk.blue('/api')} URL is already used for the JSON Server mock API. Your configuration will be ignored.`);
        }

        webpackDevServerConfiguration.proxy = proxyConfig;
      }

      // Enable API
      if (this.options.api !== undefined) {
        this.api();

        // Proxy to /api
        webpackDevServerConfiguration.proxy = Object.assign(webpackDevServerConfiguration.proxy || {}, {
          '/api': {
            target: 'http://localhost:3000',
            secure: false
          }
        });
      }

      this.logger.info(`Live Development Server is running on ${this.options.https ? 'https' : 'http'}://${this.options.host}:${this.options.port}`);

      let server = new WebpackDevServer(compiler, webpackDevServerConfiguration);
      server.listen(this.options.port, this.options.host);

      resolve();
    });
  }

  api () {
    let dbPath = path.resolve(this.project.root, this.options.api);
    let jsonServerConfigPath = path.resolve(this.project.root, this.options.jsonServerRoute);

    if (!fs.existsSync(dbPath)) {
      throw new Error(`API database file ${chalk.blue(dbPath)} does not exist.`);
    }

    let server = jsonServer.create(),
      router = jsonServer.router(dbPath),
      middlewares = jsonServer.defaults();

    server.use(middlewares);
    if (fs.existsSync(jsonServerConfigPath)) {
      require(jsonServerConfigPath)(server, this.logger);
    }
    server.use('/api', router);

    server.listen(3000, () => this.logger.info(`JSON Server is running on http://localhost:3000`));
  }

}

module.exports = Serve;
