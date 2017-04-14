const findup = require('findup'),
  fs = require('fs');

class Project {

  /**
   * Returns the Project instance
   *
   * @returns {Project}
   */
  static getInstance () {
    if (this.instance === undefined || this.instance === null) {
      this.instance = new Project();
    }

    return this.instance;
  }

  init () {
    return this._closestPackageJSON().then(() => {
      if (fs.existsSync(`${this.root}/.clea-cli.json`)) {
        this.clea = JSON.parse(fs.readFileSync(`${this.root}/.clea-cli.json`, 'utf8'));
      }

      return true;
    });
  }

  /**
   * Returns whether or not this is a Clea CLI project.
   * This checks whether `.clea-cli.json` exists in the project.
   *
   * @return {boolean} TRUE if it is; FALSE otherwise
   */
  isCleaProject () {
    return fs.existsSync(`${this.root}/.clea-cli.json`);
  }

  /**
   * Returns the closest package.json file (going up in folders)
   *
   * @private
   * @returns {Promise}
   */
  _closestPackageJSON () {
    return new Promise ((resolve, reject) => {
      findup(process.cwd(), 'package.json', (err, dir) => {
        if (err) {
          reject (err);
        }

        if (dir !== undefined) {
          this.root = dir;
          this.pkg = JSON.parse(fs.readFileSync(`${dir}/package.json`, 'utf8'));
        }

        resolve();
      });
    });
  }

}

Project.TYPE = {
  APPLICATION: 'application',
  LIBRARY: 'library'
};

module.exports = Project;
