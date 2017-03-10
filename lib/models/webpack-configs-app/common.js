const path = require('path'),
  fs = require('fs'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
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
      modules: [
        rootPath,
        'node_modules'
      ],

      // Add `.ts` as a resolvable extension.
      extensions: [ '.ts', '.js' ]
    },

    module : {
      rules: [
        // Typescript files
        {
          test   : /\.tsx?$/,
          use: [
            {
              loader: 'ng-annotate-loader'
            },
            {
              loader: 'ts-loader',
              options: {
                silent: true
              }
            }
          ],
          exclude: [ /\.(spec|e2e)\.ts$/ ]
        },
        // Angular templates
        {
          test  : /\.html$/,
          loader: 'raw-loader'
        },
        // Images
        {
          test   : /\.(png|jpg|jpeg|gif)$/,
          loader : 'url-loader',
          options: {
            limit: 8192
          }
        },
        // Fonts
        {
          test   : /\.woff(\?.+)?$/,
          loader : 'url-loader',
          options: {
            limit   : 10000,
            minetype: 'application/font-woff'
          }
        },
        {
          test   : /\.woff2$/,
          loader : 'url-loader',
          options: {
            limit   : 10000,
            minetype: 'application/font-woff2'
          }
        },
        {
          test   : /\.ttf(\?.+)?$/,
          loader : 'url-loader',
          options: {
            limit   : 10000,
            minetype: 'application/octet-stream'
          }
        },
        {
          test  : /\.eot(\?.+)?$/,
          loader: 'file-loader'
        },
        {
          test   : /\.svg(\?.+)?$/,
          loader : 'url-loader',
          options: {
            limit   : 10000,
            minetype: 'image/svg+xml'
          }
        },
        // JSON
        {
          test  : /\.json$/,
          loader: 'json-loader'
        },
        // CSS Stylesheets
        {
          test  : /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use     : [ 'css-loader', 'postcss-loader' ]
          })
        },
        // SASS Stylesheets
        {
          test  : /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use     : [ 'css-loader', 'postcss-loader', 'sass-loader' ]
          })
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin([ options.outputPath ? options.outputPath : 'dist/' ], {
        root: path.resolve('.'),
        verbose: false
      }),
      new HtmlWebpackPlugin({
        inject  : 'body',
        template: './src/public/index.html'
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
