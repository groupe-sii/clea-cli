const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

function serve (project, options) {
  let rootPath = path.join(project.root, project.akg.root);

  return {
    module: {
      loaders: [
        // CSS Stylesheets
        {
          test  : /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', ['css-loader?importLoaders=1', 'postcss-loader'])
        },
        // SASS Stylesheets
        {
          test  : /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', ['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader'])
        }
      ]
    },

    output: {
      // Output directory
      path: '/',

      // Filename of each output file on disk
      filename: '[name].bundle.js',

      // Filename of each non-entry chunk
      chunkFilename: '[id].chunk.js'
    },

    devtool: 'cheap-module-source-map',

    debug: true,

    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(rootPath, 'public/assets'),
          to: './assets'
        },
        {
          from: path.join(rootPath, 'config'),
          to: './config'
        }
      ]),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin('[name].bundle.css')
    ]
  };
}

module.exports = serve;
