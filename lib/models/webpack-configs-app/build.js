const path = require('path'),
  webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'),
  TypedocWebpackPlugin = require('typedoc-webpack-plugin');

function build (project, options, swConfig = null) {
  let rootPath = path.join(project.root, project.clea.root);

  let config = {

    output: {
      // Output directory
      path: options.outputPath,

      // Filename of each output file on disk
      filename: '[name].[chunkhash].bundle.js',

      // Filename of each SourceMap file
      sourceMapFilename: '[name].[chunkhash].bundle.map',

      // Filename of each non-entry chunk
      chunkFilename: '[id].[chunkhash].chunk.js'
    },

    // Sourcemap generation mode
    devtool: options.sourcemap ? 'source-map' : undefined,

    plugins: [
      new CleanWebpackPlugin([ options.outputPath ? options.outputPath : 'dist/' ], {
        root: path.resolve('.'),
        verbose: false
      }),
      new CopyWebpackPlugin([{
        from: path.join(rootPath, 'public')
      }]),
      new webpack.optimize.UglifyJsPlugin({
        // Mangler options
        mangle  : {
          except: ['$super', '$', 'exports', 'require', 'angular', '$log']
        },
        compress: {
          // No compilance with IE6-8 quirks
          screw_ie8    : true,
          drop_debugger: true,
          drop_console : true
        },
        // Remove comments
        comments: false
      }),
      new ExtractTextPlugin('[name].[hash].bundle.css')
    ]
  };

  if (options.enableDoc) {
    config.plugins.push(new TypedocWebpackPlugin({
      out: '../dist-docs',
      module: 'commonjs',
      target: 'es5',
      exclude: '**/node_modules/**/*.*',
      experimentalDecorators: true,
      excludeExternals: true
    }));
  }

  if (swConfig !== null) {
    config.plugins.push(new SWPrecacheWebpackPlugin(Object.assign({
      cacheId    : options.name,
      filename   : 'service-worker.js',
      stripPrefix: options.outputPath,
      minify     : true
    }, swConfig)));
  }

  return config;
}

module.exports = build;
