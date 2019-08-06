require('chai').should();

const fs = require('fs-extra'),
  path = require('path'),
  expect = require('chai').expect,

  Generate = require('../../lib/commands/generate'),
  helper = new (require('../helper'))();

const appDir = `src${path.sep}app`,
  BLUEPRINT = 'service';

describe ('Blueprint::Service', () => {
  let project;

  beforeEach (() => helper.setup().then((pjt) => {
    project = pjt;
  }));

  it ('should generate service my-test-service', (done) => {
    Generate.create(BLUEPRINT, 'my-test-service', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-service.service.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-service.service.spec.ts'))).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate service sub/my-test-service', (done) => {
    fs.mkdirSync(path.join(project.root, appDir, 'sub'));

    Generate.create(BLUEPRINT, 'sub/my-test-service', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-service.service.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-service.service.spec.ts'))).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate service ../my-test-service', (done) => {
    fs.mkdirSync(path.join(appDir, 'sub'));
    process.chdir(path.join(appDir, 'sub'));

    Generate.create(BLUEPRINT, '../my-test-service', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-service.service.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-service.service.spec.ts'))).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate spec file', (done) => {
    project.clea.spec.service = false;

    Generate.create(BLUEPRINT, 'my-test-service', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-service.service.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-service.service.spec.ts'))).to.equal(false);

      done();
    }).catch((err) => done(err));
  });

  afterEach (() => helper.endup());

});
