require('chai').should();

const fs = require('fs-extra'),
  path = require('path'),
  expect = require('chai').expect,

  Generate = require('../../lib/commands/generate'),
  helper = new (require('../helper'))(),
  root = process.cwd(),
  testPath = path.join(root, 'tmp', 'src', 'app'),
  BLUEPRINT = 'component';

describe ('Blueprint::Component', () => {

  beforeEach (() => helper.setup());

  it ('should generate component my-test-component', (done) => {
    Generate.create(BLUEPRINT, 'my-test-component', {
      quiet: true
    }).then(() => {
      expect(fs.existsSync(path.join(testPath, 'my-test-component', 'my-test-component.component.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(testPath, 'my-test-component', 'my-test-component.component.spec.ts'))).to.equal(true);
      expect(fs.existsSync(path.join(testPath, 'my-test-component', 'my-test-component.component.scss'))).to.equal(true);
      expect(fs.existsSync(path.join(testPath, 'my-test-component', 'my-test-component.component.html'))).to.equal(true);
      expect(fs.existsSync(path.join(testPath, 'my-test-component', 'my-test-component.controller.ts'))).to.equal(true);

      done();
    }).catch((err) => done(err));
  });

  afterEach (() => helper.endup());

});
