const fs = require('fs-extra'),
  denodify = require('denodeify'),
  remove = denodify(fs.remove),
  InitProject = require('../lib/commands/init-project'),
  project = require('../lib/project').getInstance();

class Helper {

  constructor (name = 'tmp') {
    this.root = process.cwd();
    this.path = `./${name}`;

    this.initProject = new InitProject(name, 'application', {
      quiet            : true,
      init             : false,
      verbose          : false,
      uiFramework      : undefined,
      makeItProgressive: false,
      skipInstall      : true,
      skipGit          : true
    });
  }

  setup () {
    process.chdir(this.root);

    return remove(this.path).then(() => {
      this.initProject.createFolder();

      return this.initProject.start();
    }).then(() => {
      process.chdir(this.path);

      return project.init(true);
    });
  }

  endup () {
    process.chdir(this.root);

    return fs.existsSync(this.path) ? remove(this.path) : Promise.resolve();
  }

}

module.exports = Helper;
