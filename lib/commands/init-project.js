const inquirer = require('inquirer'),
  ejs = require('ejs'),
  fs = require('fs-extra'),
  glob = require('glob'),
  slugify = require('slugify'),
  path = require('path'),
  spawn = require('child_process').spawn,
  chalk = require('chalk'),
  os = require('os'),
  Spinner = require('cli-spinner').Spinner,
  DynamicPathParser = require('../utilities/dynamic-path-parser'),

  logger = require('../../vendors/logger');

const prompt = inquirer.createPromptModule();

class InitProject {

  /**
   * Instantiate a new InitProject
   *
   * @param {string}  name    Application name
   * @param {string}  type    Application type
   * @param {Object}  options Generator options
   */
  constructor (name, type, options) {
    this.name = name;
    this.type = type;
    this.options = options;
    this.normalizedName = slugify(name);
    this.projectPath = (options.init) ? './' : `./${this.normalizedName}`;
    this.answsers = {};
  }

  /**
   * Allowed types for `akg new` and `akg init` commands
   *
   * @returns {Array<String>}
   */
  static allowedTypes () {
    return [].concat(InitProject.APPLICATION, InitProject.LIBRARY);
  }

  createFolder () {
    try {
      fs.mkdirSync(this.projectPath);
    } catch (err) {
      throw new Error(`Directory "${this.normalizedName}" already exists`);
    }
  }

  start () {
    logger.pop(`installing '${this.name}'`);

    return this.copyStaticFiles()
      .then(() => this.copyFiles({
        appName   : this.name,
        domain    : this.answsers.domain,
        tracking  : this.answsers.tracking,
        slugify   : slugify,
        ngMaterial: this.options.uiFramework === 'material',
        bootstrap : this.options.uiFramework === 'bootstrap'
      }))
      .then(() => {
        logger.pop(os.EOL);

        return this.installDependencies();
      })
      .then(() => logger.info(`${os.EOL}Project '${this.name}' successfully created.`));
  }

  packageManager () {
    return new Promise((resolve) => {
      prompt({
        name   : 'packageManager',
        type   : 'list',
        message: 'What package manager should i use to install your dependencies ?',
        default: 'npm',
        choices: [
          {
            name : 'npm, a package manager for javascript',
            value: 'npm'
          },
          {
            name : 'Yarn, Fast, reliable, and secure dependency management',
            value: 'yarn'
          }
        ]
      }).then((result) => {
        this.answsers.packageManager = result.packageManager;

        resolve();
      });
    });
  }


  copyStaticFiles () {
    let templatePath = `${__dirname}/../../src/templates/${this.type}/`;

    return new Promise((resolve, reject) => {
      glob(`${templatePath}/**/!(_*)`, (err, files) => {
        if (err) {
          reject(err);
        } else {
          for (let file of files) {
            if (fs.lstatSync(file).isDirectory()) {
              if (!fs.existsSync(`${this.projectPath}/${DynamicPathParser.relative(templatePath, file)}`)) {
                fs.mkdirSync(`${this.projectPath}/${DynamicPathParser.relative(templatePath, file)}`);
              }
            } else {
              let exists = fs.existsSync(`${this.projectPath}/${DynamicPathParser.relative(templatePath, file)}`);

              if (!exists) {
                fs.copySync(file, `${this.projectPath}/${DynamicPathParser.relative(templatePath, file)}`);
              }

              logger.pop(`  ${exists ? chalk.yellow('identical') : chalk.green('create')} ${DynamicPathParser.relative(templatePath, file)}`);
            }
          }

          resolve();
        }
      });
    });
  }

  copyFiles (data) {
    let templatePath = `${__dirname}/../../src/templates/${this.templatesFolder()}/`;

    return new Promise((resolve, reject) => {
      glob(`${templatePath}/**/_*`, (err, files) => {
        if (err) {
          reject(err);
        } else {
          for (let file of files) {
            let targetFile = DynamicPathParser.relative(templatePath, file).replace(/(.*?)_([^\/]*)/, (m, p1, p2) => `${p1}${p2}`);

            if (!fs.lstatSync(file).isDirectory()) {
              let templateString = fs.readFileSync(file, 'utf-8');
              let renderedString = ejs.render(templateString, data).replace(/<--%/g, '<%').replace(/%-->/g, '%>');
              let exists = fs.existsSync(`${this.projectPath}/${targetFile}`);

              if (!exists) {
                fs.writeFileSync(`${this.projectPath}/${targetFile}`, renderedString);
              }

              logger.pop(`  ${exists ? chalk.yellow('identical') : chalk.green('create')} ${targetFile}`);
            }
          }

          resolve();
        }
      });
    });
  }

  installDependencies () {
    return new Promise((resolve, reject) => {
      logger.info(`Installing packages for tooling via ${this.answsers.packageManager}.`);

      let spinner = new Spinner('installing');
      spinner.setSpinnerString(18);
      if (!this.options.verbose) {
        spinner.start();
      }

      spawn(this.answsers.packageManager === 'npm' ? 'npm' : 'yarn', ['install'], {
        stdio: (this.options.verbose) ? 'inherit' : 'pipe',
        cwd  : this.projectPath,
        shell: true
      })
        .on('error', (e) => reject(e.stack || e))
        .on('close', (code) => {
          if (code > 0) {
            reject('Dependencies installation failed, try to use --verbose flag to see more details');
          }

          if (spinner.isSpinning()) {
            spinner.stop();
          }

          resolve();
        });
    });
  }

}

InitProject.APPLICATION = 'application';
InitProject.LIBRARY = 'library';
InitProject.UI_FRAMEWORKS = ['bootstrap', 'material', undefined];

module.exports = InitProject;
