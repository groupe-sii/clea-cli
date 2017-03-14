const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  SwPrecacheDevWebpackPlugin = require('sw-precache-webpack-dev-plugin');

function serve (project, options, swConfig = null) {
  let rootPath = path.join(project.root, project.clea.root);

  const config = {

    output: {
      // Output directory
      path: '/',

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
      new ExtractTextPlugin('[name].bundle.css')
    ]
  };

  if (swConfig !== null) {
    config.plugins.push(new SwPrecacheDevWebpackPlugin(Object.assign({
      cacheId : options.name,
      filename: '/service-worker.js'
    }, swConfig)));
  }

  return config;
}

module.exports = serve;
