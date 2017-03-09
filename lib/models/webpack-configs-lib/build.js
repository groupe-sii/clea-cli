const ExtractTextPlugin = require('extract-text-webpack-plugin'),
  TypedocWebpackPlugin = require('typedoc-webpack-plugin');

function build (project, options) {
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
      path: 'lib/',

      // Filename of each output file on disk
      filename: 'index.js',

      // Filename of each SourceMap file
      sourceMapFilename: '[name].map',

      library: project.akg.name,

      libraryTarget: 'umd'

    },

    // Sourcemap generation mode
    devtool: options.sourcemap ? 'source-map' : undefined,

    plugins: [
      new ExtractTextPlugin('bundle.css')
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
