const path = require('path'),
  CleanWebpackPlugin = require('clean-webpack-plugin');

function common (project) {
  let rootPath = path.join(project.root, project.clea.root);

  return {

    // The entry point for the bundle
    // See: http://webpack.github.io/docs/configuration.html#entry
    entry: {
      main: path.join(rootPath, 'index.ts')
    },

    resolve: {
      root: rootPath,

      modulesDirectories: [ 'node_modules' ],

      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['', '.ts', '.tsx', '.js']
    },

    module : {
      loaders: [
        // Typescript files
        {
          test   : /\.tsx?$/,
          loaders: ['ts-loader?silent=true'],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        // Angular templates
        {
          test  : /\.html$/,
          loader: 'raw'
        },
        // Images
        {
          test  : /\.(png|jpg|jpeg|gif)$/,
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
          test  : /\.json$/,
          loader: 'json'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['lib'], {
        root   : path.resolve('.'),
        verbose: false
      })
    ]
  };
}

module.exports = common;
