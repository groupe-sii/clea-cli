module.exports = {
  files: [
    'src/vendor.ts',
    'node_modules/angular-mocks/angular-mocks.js',
    'src/**/*.spec.ts'
  ],
  preprocessors: {
    'src/vendor.ts': [ 'webpack', 'sourcemap' ],
    'src/**/*.spec.ts': [ 'webpack', 'sourcemap' ]
  },
  mime: {
    'text/x-typescript': [ 'ts' ]
  },
  webpack: require('./karma.app.webpack.conf'),
  webpackMiddleware: {
    noInfo: false,
    quiet: false,
    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunks: true,
      chunkModules: false,
      children: false,
      modules: false,
      reasons: false,
      warnings: true,
      errors: true,
      assets: false,
      version: false,
      errorDetails: false,
      moduleTrace: false,
      entrypoints: false
    }
  }
};
