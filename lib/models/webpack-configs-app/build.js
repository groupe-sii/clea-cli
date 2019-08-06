const path = require('path'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'),
  TypedocWebpackPlugin = require('typedoc-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin');

function build (project, options, swConfig = null) {
  let rootPath = path.join(project.root, project.clea.root);

  let config = {
    mode: 'production',

    output: {
      // Output directory
      path: path.resolve(project.root, options.outputPath),

      // Filename of each output file on disk
      filename: '[name].[chunkhash].js',

      // Filename of each SourceMap file
      sourceMapFilename: '[name].[chunkhash].map'
    },

    // Sourcemap generation mode
    devtool: options.sourcemap ? 'source-map' : undefined,

    performance: project.clea.performance ? project.clea.performance : { hints: false },

    plugins: [
      new CleanWebpackPlugin({
        verbose: options.verbose
      }),
      new CopyWebpackPlugin([{
        from: path.join(rootPath, 'public')
      }])
    ]
  };

  if (options.compress) {
    config.plugins.push(new CompressionPlugin());
  }

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
