require('chai').should();

const fs = require('fs-extra'),
  path = require('path'),
  expect = require('chai').expect,
  sinon = require('sinon'),

  Generate = require('../../lib/commands/generate'),
  ModuleUtils = require('../../lib/utilities/module.utils'),
  helper = new (require('../helper'))();

const appDir = `src${path.sep}app`,
  BLUEPRINT = 'module';

describe ('Blueprint::Module', () => {
  let project;

  beforeEach (() => helper.setup().then((pjt) => {
    project = pjt;
  }));

  it ('should generate module my-test-module', (done) => {
    Generate.create(BLUEPRINT, 'my-test-module', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.module.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.ts'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.spec.ts'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.scss'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.html'))).to.equal(false);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate module sub/my-test-module', (done) => {
    fs.mkdirSync(path.join(project.root, appDir, 'sub'));

    Generate.create(BLUEPRINT, 'sub/my-test-module', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-module', 'my-test-module.module.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-module', 'my-test-module.component.ts'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-module', 'my-test-module.component.spec.ts'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-module', 'my-test-module.component.scss'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-module', 'my-test-module.component.html'))).to.equal(false);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate module ../my-test-module', (done) => {
    fs.mkdirSync(path.join(appDir, 'sub'));
    process.chdir(path.join(appDir, 'sub'));

    Generate.create(BLUEPRINT, '../my-test-module', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.module.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.ts'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.spec.ts'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.scss'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.html'))).to.equal(false);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate a component for the module', (done) => {
    Generate.create(BLUEPRINT, 'my-test-module', {
      quiet    : true,
      component: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.module.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.spec.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.scss'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.html'))).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  it (`shouldn't generate spec file with module's component`, (done) => {
    project.clea.spec.module = false;

    Generate.create(BLUEPRINT, 'my-test-module', {
      quiet    : true,
      component: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.module.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.spec.ts'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.scss'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.html'))).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  it ('should lazy load the module in the parent routing file', (done) => {
    sinon.spy(ModuleUtils, 'addDeclarationToRouting');

    Generate.create(BLUEPRINT, 'my-test-module', {
      quiet   : true,
      lazyLoad: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.module.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.ts'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.spec.ts'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.scss'))).to.equal(false);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-module', 'my-test-module.component.html'))).to.equal(false);
      expect(ModuleUtils.addDeclarationToRouting.calledOnce).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  afterEach (() => helper.endup());

});
