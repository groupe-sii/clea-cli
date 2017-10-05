const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

function serve (project, options) {
  let rootPath = path.join(project.root, project.clea.root);

  const config = {

    output: {
      // Output directory
      path: path.resolve('/'),

      // Filename of each output file on disk
      filename: '[name].bundle.js',

      // Filename of each non-entry chunk
      chunkFilename: '[id].chunk.js'
    },

    devtool: 'cheap-module-source-map',

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
      new ExtractTextPlugin({
        filename: '[name].bundle.css',
        disable : true
      })
    ]
  };

  return config;
}

module.exports = serve;
