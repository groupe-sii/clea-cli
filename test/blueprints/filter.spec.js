require('chai').should();

const fs = require('fs-extra'),
  path = require('path'),
  expect = require('chai').expect,

  Generate = require('../../lib/commands/generate'),
  helper = new (require('../helper'))();

const appDir = `src${path.sep}app`,
  BLUEPRINT = 'filter';

describe ('Blueprint::Filter', () => {
  let project;

  beforeEach (() => helper.setup().then((pjt) => {
    project = pjt;
  }));

  it ('should generate filter my-test-filter', (done) => {
    Generate.create(BLUEPRINT, 'my-test-filter', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-filter.filter.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-filter.filter.spec.ts'))).to.equal(false);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate filter sub/my-test-filter', (done) => {
    fs.mkdirSync(path.join(project.root, appDir, 'sub'));

    Generate.create(BLUEPRINT, 'sub/my-test-filter', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-filter.filter.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-filter.filter.spec.ts'))).to.equal(false);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate filter ../my-test-filter', (done) => {
    fs.mkdirSync(path.join(appDir, 'sub'));
    process.chdir(path.join(appDir, 'sub'));

    Generate.create(BLUEPRINT, '../my-test-filter', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-filter.filter.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-filter.filter.spec.ts'))).to.equal(false);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate spec file', (done) => {
    project.clea.spec.filter = true;

    Generate.create(BLUEPRINT, 'my-test-filter', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-filter.filter.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-filter.filter.spec.ts'))).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  afterEach (() => helper.endup());

});
