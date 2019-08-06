const expect = require('chai').expect,

  helper = new (require('../helper'))(),
  InitProject = require('../../lib/commands/init-project');

describe ('Command::Completion', () => {
  beforeEach (() => helper.setup());

  it (`shouldn't be able to generate a library`, () => {
    expect(() => {
      const initProject = new InitProject('tmp', 'library', {
        quiet: true
      });
    }).to.throw(/option has been deactivated for now/);
  });

  it (`should throw an error if directory already exists`, () => {
    const initProject = new InitProject('tmp', 'application', {
      quiet: true
    });
    initProject.createFolder();

    expect(() => {
      initProject.createFolder();
    }).to.throw(/already exists/);
  });

  afterEach (() => helper.endup());

});
