require('chai').should();

const fs = require('fs-extra'),
  path = require('path'),
  expect = require('chai').expect,

  Generate = require('../../lib/commands/generate'),
  helper = new (require('../helper'))();

const appDir = `src${path.sep}app`,
  BLUEPRINT = 'component';

describe ('Blueprint::Component', () => {
  let project;

  beforeEach (() => helper.setup().then((pjt) => {
    project = pjt;
  }));

  it ('should generate component my-test-component', (done) => {
    Generate.create(BLUEPRINT, 'my-test-component', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-component', 'my-test-component.component.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-component', 'my-test-component.component.spec.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-component', 'my-test-component.component.scss'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-component', 'my-test-component.component.html'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-component', 'my-test-component.controller.ts'))).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate component sub/my-test-component', (done) => {
    fs.mkdirSync(path.join(project.root, appDir, 'sub'));

    Generate.create(BLUEPRINT, 'sub/my-test-component', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-component', 'my-test-component.component.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-component', 'my-test-component.component.spec.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-component', 'my-test-component.component.scss'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-component', 'my-test-component.component.html'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'sub', 'my-test-component', 'my-test-component.controller.ts'))).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  it ('should generate component ../my-test-component', (done) => {
    fs.mkdirSync(path.join(appDir, 'sub'));
    process.chdir(path.join(appDir, 'sub'));

    Generate.create(BLUEPRINT, '../my-test-component', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-component', 'my-test-component.component.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-component', 'my-test-component.component.spec.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-component', 'my-test-component.component.scss'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-component', 'my-test-component.component.html'))).to.equal(true);
      expect(fs.existsSync(path.join(project.root, appDir, 'my-test-component', 'my-test-component.controller.ts'))).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  afterEach (() => helper.endup());

});
