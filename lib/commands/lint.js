const fs = require('fs'),
  path = require('path'),
  os = require('os'),
  chalk = require('chalk'),
  project = require('../project').getInstance(),
  TSLint = require('tslint').Linter,
  TSLintConfiguration = require('tslint').Configuration,
  sasslint = require('sass-lint'),
  logger = require('../../vendors/logger');

class Lint {

  constructor (options) {
    this.project = project;
    this.options = options;
    this.logger = logger;

    this.tsConfigPath = path.join(this.project.root, 'tsconfig.json');
    this.tsLintPath = path.join(this.project.root, 'tslint.json');
    this.sassLintPath = path.join(this.project.root, '.sass-lint.yml');
  }

  start () {
    return new Promise ((resolve, reject) => {
      if (project.isAKGProject()) {
        this.tslint()
          .then(() => this.sasslint())
          .then(() => resolve());
      } else {
        reject(`You have to be inside an project in order to use the ${chalk.green('lint')} command.`);
      }
    });
  }

  tslint () {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.tsLintPath)) {
        this.logger.warning(`[TSLint] WARNING: Task ignored. ${chalk.blue(this.tsLintPath)} file does not exists.`);

        resolve();
      }

      let program = TSLint.createProgram(this.tsConfigPath),
        files = TSLint.getFileNames(program),
        linter = new TSLint({
          fix: this.options.fix
        }, program);

      files.forEach((file) => {
        let fileContents = program.getSourceFile(file).getFullText();
        let configLoad = TSLintConfiguration.findConfiguration(this.tsLintPath, file);

        linter.lint(file, fileContents, configLoad.results);
      });

      let result = linter.getResult();
      this.logger.pop(result.output.trim().concat(os.EOL));

      this._getOut('TSLint', result.failureCount, resolve, reject);
    });
  }

  sasslint () {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.sassLintPath)) {
        this.logger.warning(`[SASSLint] WARNING: Task ignored. ${chalk.blue(this.sassLintPath)} file does not exists.`);

        resolve();
      }

      let results = sasslint.lintFiles('src/**/*.scss', {}, this.sassLintPath),
        failureCount = results.reduce((prev, result) => prev += result.errorCount, 0);

      sasslint.outputResults(results);

      this._getOut('SASSLint', failureCount, resolve, reject);
    });
  }

  _getOut (linterName, failureCount, resolve, reject) {
    if (failureCount > 0) {
      this.logger.error(`[${linterName}] Lint errors found in the listed files.`);

      if (this.options.force) {
        resolve();
      } else {
        reject();
      }
    } else {
      this.logger.info(`[${linterName}] All files pass linting.`);

      resolve();
    }
  }

}

module.exports = Lint;
