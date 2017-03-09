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
      if (fs.existsSync(`${this.root}/akg.json`)) {
        this.akg = JSON.parse(fs.readFileSync(`${this.root}/akg.json`, 'utf8'));
      }

      return true;
    });
  }

  /**
   * Returns whether or not this is an AKG Generator project.
   * This checks whether `akg.json` exists in the project.
   *
   * @return {boolean} TRUE if it is; FALSE otherwise
   */
  isAKGProject () {
    return fs.existsSync(`${this.root}/akg.json`);
  }

  /**
   * Returns the dependencies from a package.json
   *
   * @private
   * @method dependencies
   * @param  {Object=}  pkg             Package object. If false, the current package is used.
   * @param  {boolean=} excludeDevDeps  Whether or not development dependencies should be excluded, defaults to false.
   * @return {Object}                   Dependencies
   */
  _dependencies (pkg, excludeDevDeps = false) {
    pkg = pkg || this.pkg || {};

    return Object.assign({}, (excludeDevDeps) ? {} : pkg.devDependencies, pkg.dependencies);
  }

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
