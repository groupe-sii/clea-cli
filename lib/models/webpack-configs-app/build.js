const path = require('path'),
  webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  TypedocWebpackPlugin = require('typedoc-webpack-plugin');

function build (project, options) {
  let rootPath = path.join(project.root, project.akg.root);

  let config = {

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

    // Debug mode of loaders
    debug: false,

    plugins: [
      new CopyWebpackPlugin([{
        from: path.join(rootPath, 'public')
      }]),
      new webpack.optimize.DedupePlugin(),
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

  return config;
}

module.exports = build;
