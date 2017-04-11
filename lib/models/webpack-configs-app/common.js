const path = require('path'),
  fs = require('fs'),
  webpack = require('webpack'),
  ProgressPlugin = require('webpack/lib/ProgressPlugin'),
  { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin'),
  { CommonsChunkPlugin } = require('webpack').optimize,
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (project, options) => {
  let rootPath = path.join(project.root, project.clea.root),
    sourceConfigPath = path.join(rootPath, project.clea.environmentSource),
    configPath = path.join(rootPath, project.clea.environments[options.target]),
    sourceConfig = JSON.parse(fs.readFileSync(sourceConfigPath, 'utf8')),
    config = JSON.parse(fs.readFileSync(configPath, 'utf8')),
    nodeModules = path.resolve(project.root, 'node_modules');

  let webpackConfig = {

    entry: {
      main  : [
        path.join(rootPath, 'app/app.module.ts')
      ],
      styles: [
        path.join(rootPath, 'styles/main.scss')
      ]
    },

    resolve: {
      extensions: [
        '.ts',
        '.js'
      ],
      modules: [ nodeModules ]
    },

    resolveLoader: {
      modules: [ nodeModules ]
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
            use     : [ 'css-loader?{"sourceMap":false,"importLoaders":1}', 'postcss-loader' ]
          })
        },
        // SASS Stylesheets
        {
          test   : /\.scss$|\.sass$/,
          loaders: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use     : [ 'css-loader?{"sourceMap":false,"importLoaders":1}', 'postcss-loader', 'sass-loader' ]
          })
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(rootPath, 'public/index.html'),
        hash    : false,
        inject  : true,
        xhtml   : true
      }),
      new BaseHrefWebpackPlugin({
        baseHref: options.baseHref
      }),
      new CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => module.resource && module.resource.startsWith(nodeModules),
        chunks: [ 'main' ]
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(options.target),
        CONFIG: JSON.stringify(Object.assign(sourceConfig, config))
      })
    ]
  };

  if (options.progress) {
    webpackConfig.plugins.push(new ProgressPlugin());
  }

  return webpackConfig;
};
