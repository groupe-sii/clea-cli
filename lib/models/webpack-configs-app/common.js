const path = require('path'),
  fs = require('fs'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (project, options) => {
  let rootPath = path.join(project.root, project.akg.root),
    sourceConfigPath = path.join(rootPath, project.akg.environments.source),
    configPath = path.join(rootPath, project.akg.environments[options.target]),
    sourceConfig = JSON.parse(fs.readFileSync(sourceConfigPath, 'utf8')),
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));


  return {

    // The entry point for the bundle
    // See: http://webpack.github.io/docs/configuration.html#entry
    entry: {
      vendor: path.join(rootPath, 'vendor.ts'),
      main: [ path.join(rootPath, 'app/app.module.ts') ]
    },

    resolve: {
      // Make sure root is src
      root: rootPath,

      // remove other default values
      modulesDirectories: [ 'node_modules' ],

      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [ '', '.ts', '.tsx', '.js' ]
    },

    module: {
      loaders: [
        // Typescript files
        {
          test: /\.tsx?$/,
          loaders: ['ng-annotate', 'ts-loader?silent=true'],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        // Angular templates
        {
          test: /\.html$/,
          loader: 'raw-loader'
        },
        // Images
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: `url-loader?limit=8192`
        },
        // Fonts
        {
          test  : /\.woff(\?.+)?$/,
          loader: 'url-loader?limit=10000&minetype=application/font-woff'
        },
        {
          test  : /\.woff2$/,
          loader: 'url-loader?limit=10000&minetype=application/font-woff2'
        },
        {
          test  : /\.ttf(\?.+)?$/,
          loader: 'url-loader?limit=10000&minetype=application/octet-stream'
        },
        {
          test  : /\.eot(\?.+)?$/,
          loader: 'file-loader'
        },
        {
          test  : /\.svg(\?.+)?$/,
          loader: 'url-loader?limit=10000&minetype=image/svg+xml'
        },
        // JSON
        {
          test: /\.json$/,
          loader: 'json'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([ options.outputPath ? options.outputPath : 'dist/' ], {
        root: path.resolve('.'),
        verbose: false
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: `ejs-render?environement=${options.target}!${path.join(rootPath, 'public/index.ejs')}`
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(options.target),
        CONFIG: JSON.stringify(Object.assign(sourceConfig, config))
      })
    ]
  };
};
