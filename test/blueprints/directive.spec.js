require('chai').should();

const fs = require('fs-extra'),
  path = require('path'),
  expect = require('chai').expect,

  Generate = require('../../lib/commands/generate'),
  helper = new (require('../helper'))();

const appDir = `src${path.sep}app`,
  BLUEPRINT = 'directive';

describe ('Blueprint::Directive', () => {
  let project;

  beforeEach (() => helper.setup().then((pjt) => {
    project = pjt;
  }));

  it ('should generate directive my-test-directive', (done) => {
    Generate.create(BLUEPRINT, 'my-test-directive', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-directive.directive.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-directive.directive.spec.ts'))).to.equal(false);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate directive sub/my-test-directive', (done) => {
    fs.mkdirSync(path.join(project.root, appDir, 'sub'));

    Generate.create(BLUEPRINT, 'sub/my-test-directive', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-directive.directive.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-directive.directive.spec.ts'))).to.equal(false);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate directive ../my-test-directive', (done) => {
    fs.mkdirSync(path.join(appDir, 'sub'));
    process.chdir(path.join(appDir, 'sub'));

    Generate.create(BLUEPRINT, '../my-test-directive', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-directive.directive.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-directive.directive.spec.ts'))).to.equal(false);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate spec file', (done) => {
    project.clea.spec.directive = true;

    Generate.create(BLUEPRINT, 'my-test-directive', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-directive.directive.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-directive.directive.spec.ts'))).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  afterEach (() => helper.endup());

});
