const path = require('path'),
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),

  helper = new (require('../helper'))(),
  Bundler = require('../../lib/bundler');

chai.use(chaiAsPromised);

const expect = chai.expect;

describe ('Command::Bundler', () => {
  let project;

  beforeEach (() => helper.setup().then((pjt) => {
    project = pjt;
  }));

  it (`shouldn't be able to bundle outside a Clea project`, () => {
    project.root = path.join(process.cwd(), '../');

    const bundler = new Bundler();

    return bundler.start().should.be.rejectedWith(/You have to be inside a Clea project/);
  });

  it (`shouldn't be able to bundle with a missing environmentSource property`, () => {
    project.clea.environmentSource = undefined;

    const bundler = new Bundler();

    return bundler.start().should.be.rejectedWith(/environment is missing in \.clea-cli\.json/);
  });

  it (`should throw an error if environmentSource file doesn't exists` , () => {
    project.clea.environmentSource = 'unknownSource';

    const bundler = new Bundler('build', {
      target: 'development'
    });

    return bundler.start().should.be.rejectedWith(/configuration file .*? is missing/);
  });

  it ('should throw an error for unknown environments', () => {
    const bundler = new Bundler('build', {
      target: 'unknown'
    });

    return bundler.start().should.be.rejectedWith(/Unknown environment/);
  });

  it (`should throw an error if environment file doesn't exists`, () => {
    project.clea.environments.development = 'unknown';

    const bundler = new Bundler('build', {
      target: 'development'
    });

    return bundler.start().should.be.rejectedWith(/configuration file .*? is missing/);
  });

  it (`should resolve bundle method by default`, () => {
    const bundler = new Bundler('build', {
      target: 'development'
    });

    return bundler.bundle().should.be.fulfilled;
  });

  it (`should resolve bundle method by default`, () => {
    const bundler = new Bundler('build', {
      target: 'development'
    });

    return bundler.bundle().should.be.fulfilled;
  });

  it (`should resolve after method by default`, () => {
    const bundler = new Bundler('build', {
      target: 'development'
    });

    return bundler.after().should.be.fulfilled;
  });

  it ('should retrieve non-verbose stats by default', () => {
    const bundler = new Bundler('build', {
      target: 'development'
    });

    return expect(bundler.stats()).to.deep.equal({
      colors      : true,
      hash        : true,
      timings     : true,
      chunks      : true,
      chunkModules: false,
      children    : false,
      modules     : false,
      reasons     : false,
      warnings    : true,
      assets      : false,
      version     : false
    });
  });

  it ('should retrieve verbose stats', () => {
    const bundler = new Bundler('build', {
      verbose: true,
      target : 'development'
    });

    return expect(bundler.stats()).to.deep.equal({
      colors      : true,
      hash        : true,
      timings     : true,
      chunks      : true,
      chunkModules: false,
      children    : true,
      modules     : false,
      reasons     : true,
      warnings    : true,
      assets      : true,
      version     : true
    });
  });

  it ('should retrieve the webpack common configuration file', () => {
    const bundler = new Bundler('build', {
      target: 'development'
    });

    // Common configuration should have an entry point
    expect(bundler.getConfig().entry).to.not.be.undefined; // eslint-disable-line no-unused-expressions
  });

  afterEach (() => helper.endup());

});
