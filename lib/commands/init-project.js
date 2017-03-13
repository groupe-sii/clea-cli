const ejs = require('ejs'),
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

    let excludedFiles = [];

    // To copy only if `--make-it-progressive` option has been used
    if (!this.options.makeItProgressive) {
      excludedFiles = excludedFiles.concat([
        'src/public/assets/launcher/launcher-64x64.png',
        'src/public/assets/launcher/launcher-128x128.png',
        'src/public/assets/launcher/launcher-144x144.png',
        'src/public/assets/launcher/launcher-152x152.png',
        'src/public/assets/launcher/launcher-192x192.png',
        'src/public/_manifest.json'
      ]);
    }

    return this.copyStaticFiles(excludedFiles)
      .then(() => this.copyFiles({
        appName      : this.name,
        slugifiedName: slugify(this.name),
        ngMaterial   : this.options.uiFramework === 'material',
        bootstrap    : this.options.uiFramework === 'bootstrap',
        pwa          : this.options.makeItProgressive
      }, excludedFiles))
      .then(() => (this.options.skipInstall) ? Promise.resolve() : this.installDependencies())
      .then(() => logger.info(`${os.EOL}Project '${this.name}' successfully created.`));
  }

  copyStaticFiles (excludedFiles = []) {
    let templatePath = `${__dirname}/../../templates/${this.type}/`;

    return new Promise((resolve, reject) => {
      glob(`${templatePath}/**/!(_*)`, (err, files) => {
        if (err) {
          reject(err);
        } else {
          for (let file of files) {
            const relativeFilePath = DynamicPathParser.relative(templatePath, file);

            if (!excludedFiles.includes(relativeFilePath)) {
              if (fs.lstatSync(file).isDirectory()) {
                if (!fs.existsSync(`${this.projectPath}/${relativeFilePath}`)) {
                  fs.mkdirSync(`${this.projectPath}/${relativeFilePath}`);
                }
              } else {
                let exists = fs.existsSync(`${this.projectPath}/${relativeFilePath}`);

                if (!exists) {
                  fs.copySync(file, `${this.projectPath}/${relativeFilePath}`);
                }

                logger.pop(`  ${exists ? chalk.yellow('identical') : chalk.green('create')} ${relativeFilePath}`);
              }
            }
          }

          resolve();
        }
      });
    });
  }

  copyFiles (data, excludedFiles = []) {
    let templatePath = `${__dirname}/../../templates/${this.type}/`;

    return new Promise((resolve, reject) => {
      glob(`${templatePath}/**/_*`, (err, files) => {
        if (err) {
          reject(err);
        } else {
          for (let file of files) {
            let relativeFilePath = DynamicPathParser.relative(templatePath, file),
              targetFile = relativeFilePath.replace(/(.*?)_([^\/]*)/, (m, p1, p2) => `${p1}${p2}`);

            if (!excludedFiles.includes(relativeFilePath)) {
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
          }

          resolve();
        }
      });
    });
  }

  installDependencies () {
    return new Promise((resolve, reject) => {
      logger.pop(os.EOL);
      logger.info(`Installing packages for tooling via NPM.`);

      let spinner = new Spinner('installing');
      spinner.setSpinnerString(18);
      if (!this.options.verbose) {
        spinner.start();
      }

      spawn('npm', ['install'], {
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

InitProject.UI_FRAMEWORKS = ['bootstrap', 'material', undefined];

module.exports = InitProject;
