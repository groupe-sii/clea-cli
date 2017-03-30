const fs = require('fs-extra'),
  denodify = require('denodeify'),
  remove = denodify(fs.remove),

  root = process.cwd();

class Helper {

  static setup (path = './tmp') {
    process.chdir(root);

    return remove(path).then(() => fs.mkdirsSync(path));
  }

  static endup (path = './tmp') {
    process.chdir(root);

    return fs.existsSync(path) ? remove(path) : Promise.resolve();
  }

}

module.exports = Helper;
