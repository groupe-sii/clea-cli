const path = require('path'),
  fs = require('fs'),
  expect = require('chai').expect,

  helper = new (require('../helper'))(),
  Generate = require('../../lib/commands/generate');

describe ('Commands::Generate', () => {
  let project;

  beforeEach (() => helper.setup().then((pjt) => {
    project = pjt;
  }));

  it (`shouldn't be able to generate outside a Clea project`, () => {
    project.root = path.join(process.cwd(), '../');

    expect(() => {
      Generate.create();
    }).to.throw(/You have to be inside a Clea project/);
  });

  it (`should throw an error for unknown blueprints`, () => {
    expect(() => {
      Generate.create();
    }).to.throw(/Unknown blueprint/);
  });

  afterEach (() => helper.endup());

});
