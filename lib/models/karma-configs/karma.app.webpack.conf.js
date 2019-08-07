const path = require('path');
webpack = require('webpack'),
  ProgressPlugin = require('webpack/lib/ProgressPlugin');

module.exports = (project, options) => {
  const rootPath = path.join(project.root, project.clea.root),
    nodeModules = path.resolve(project.root, 'node_modules');

  const config = {
    mode: 'development',

    devtool: false,

    resolve: {
      extensions: [
        '.ts',
        '.js'
      ],
      modules   : [ nodeModules ]
    },

    resolveLoader: {
      modules: [ nodeModules ]
    },

    module: {
      rules: [
        // Typescript files
        {
          test: /\.ts$/,
          use : [
            {
              loader: 'ng-annotate-loader'
            },
            {
              loader : 'ts-loader',
              options: {
                silent: true
              }
            }
          ]
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
          test: /\.css$/,
          use : [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        // SASS Stylesheets
        {
          test: /\.scss$/,
          use : [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },

    performance: {
      hints: false
    },

    plugins: [
      new webpack.DefinePlugin({
        ENV   : JSON.stringify('TEST'),
        CONFIG: JSON.stringify({})
      })
    ]
  };

  if (options.progress) {
    config.plugins.push(new ProgressPlugin());
  }

  return config;
};
