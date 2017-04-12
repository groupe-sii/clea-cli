const path = require('path'),
  fs = require('fs'),
  expect = require('chai').expect,

  helper = new (require('../helper'))(),
  Project = require('../../lib/project'),
  DynamicPathParser = require('../../lib/utilities/dynamic-path-parser');

const appDir = `src${path.sep}app`;

describe ('Utilities::DynamicPathParser', () => {
  let project;

  beforeEach (() => helper.setup().then(() => {
    project = Project.getInstance();

    return true;
  }));

  it ('parse from project root directory', () => {
    const parsedPath = DynamicPathParser.parse(project, 'tmp-name');

    expect(parsedPath.dir).to.equal(appDir);
    expect(parsedPath.appRoot).to.equal(appDir);
    expect(parsedPath.entityDir).to.equal(appDir);
    expect(parsedPath.entityPath).to.equal(path.join(process.cwd(), appDir));
  });

  it (`parse from project src${path.sep}test directory`, () => {
    const subFolder = 'test',
      root = process.cwd();

    fs.mkdirSync(path.join('src', subFolder));
    process.chdir(path.join('src', subFolder));

    const parsedPath = DynamicPathParser.parse(project, 'tmp-name');

    expect(parsedPath.dir).to.equal(appDir);
    expect(parsedPath.appRoot).to.equal(appDir);
    expect(parsedPath.entityDir).to.equal(appDir);
    expect(parsedPath.entityPath).to.equal(path.join(root, appDir));
  });

  it (`parse from project src${path.sep}app${path.sep}test directory`, () => {
    const subFolder = 'test',
      root = process.cwd();

    fs.mkdirSync(path.join(appDir, subFolder));
    process.chdir(path.join(appDir, subFolder));

    const parsedPath = DynamicPathParser.parse(project, 'tmp-name');

    expect(parsedPath.dir).to.equal(path.join(appDir, subFolder));
    expect(parsedPath.appRoot).to.equal(appDir);
    expect(parsedPath.entityDir).to.equal(path.join(appDir, subFolder));
    expect(parsedPath.entityPath).to.equal(path.join(root, appDir, subFolder));
  });

  it ('should add a sub directory to the entity information', () => {
    const entityName = 'tmp-name',
      parsedPath = DynamicPathParser.parse(project, entityName, true);

    expect(parsedPath.dir).to.equal(appDir);
    expect(parsedPath.appRoot).to.equal(appDir);
    expect(parsedPath.entityDir).to.equal(path.join(appDir, entityName));
    expect(parsedPath.entityPath).to.equal(path.join(process.cwd(), appDir, entityName));
  });

  it ('should dasherize and slugify the entity name', () => {
    const parsedPath = DynamicPathParser.parse(project, 'tmpNamé');

    expect(parsedPath.name).to.equal('tmp-name');
  });

  it ('should throw an error when entity directory is located above the app directory', () => {
    expect(() => {
      DynamicPathParser.parse(project, '../tmp-name');
    }).to.throw();
  });

  it (`should throw an error when entity path doesn't exists on disk`, () => {
    expect(() => {
      DynamicPathParser.parse(project, `test/tmp-name`);
    }).to.throw();
  });

  afterEach (() => helper.endup());

});
