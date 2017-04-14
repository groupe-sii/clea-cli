const path = require('path'),
  fs = require('fs'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  CompressionPlugin = require('compression-webpack-plugin'),
  TypedocWebpackPlugin = require('typedoc-webpack-plugin'),
  SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'),

  helper = new (require('../helper'))(),
  Build = require('../../lib/commands/build');

chai.use(chaiAsPromised);

const expect = chai.expect,
  defaultConfiguration = {
    target    : 'development',
    outputPath: 'dist/'
  };

describe ('Command::Build', () => {
  let project;

  beforeEach (() => helper.setup().then((pjt) => {
    project = pjt;
  }));

  it ('should generate the default webpack build configuration', () => {
    const build = new Build(defaultConfiguration);

    // In build configuration, `output.path` should point to the `dist` directory
    expect(build.getConfig().output.path).to.equal(`${process.cwd()}${path.sep}dist`);
  });

  it ('should add the CompressionPlugin to webpack configuration', () => {
    const build = new Build(Object.assign(defaultConfiguration, {
        compress: true
      })),
      config = build.getConfig();

    expect(config.plugins[config.plugins.length - 1]).to.deep.instanceof(CompressionPlugin);
  });

  it ('should add the TypedocWebpackPlugin to webpack configuration', () => {
    const build = new Build(Object.assign(defaultConfiguration, {
        enableDoc: true
      })),
      config = build.getConfig();

    expect(config.plugins[config.plugins.length - 1]).to.deep.instanceof(TypedocWebpackPlugin);
  });

  it ('should add the SWPrecacheWebpackPlugin to webpack configuration', () => {
    project.clea.swConfig = './api.conf.js'; // Because we just want an existing file (Errors are tested in ProgressiveWebApp test file)

    const build = new Build(defaultConfiguration),
      config = build.getConfig();

    expect(config.plugins[config.plugins.length - 1]).to.deep.instanceof(SWPrecacheWebpackPlugin);
  });

  it ('should merge the webpack configuration with the given one', () => {
    fs.writeFileSync('webpack.conf.js', `module.exports = { devtool: 'cheap-module-source-map' }`, 'utf8');

    const build = new Build(Object.assign(defaultConfiguration, {
      mergeConfig: 'webpack.conf.js'
    }));

    expect(build.getConfig().devtool).to.equal('cheap-module-source-map');
  });

  it ('should override the webpack configuration by the given one', () => {
    fs.writeFileSync('webpack.conf.js', `module.exports = { devtool: 'cheap-module-source-map' }`, 'utf8');

    const build = new Build(Object.assign(defaultConfiguration, {
      overrideConfig: 'webpack.conf.js'
    }));

    expect(build.getConfig()).to.deep.equal({
      devtool: 'cheap-module-source-map'
    });
  });

  afterEach (() => helper.endup());

});
