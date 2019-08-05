const ejs = require('ejs'),
  fs = require('fs'),
  path = require('path'),
  chalk = require('chalk'),

  project = require('../project').getInstance(),
  StringUtils = require('../utilities/string.utils'),
  ModuleUtils = require('../utilities/module.utils'),
  DynamicPathParser = require('../utilities/dynamic-path-parser'),
  logger = require('../../vendors/logger');

class Blueprints {

  constructor (blueprint, entityName, options, subFolder = false) {
    this.project = project;
    this.entityName = entityName;
    this.options = options;

    this.files = [];
    this.filesPath = path.join(__dirname, blueprint, 'files');
    this.parsedPath = DynamicPathParser.parse(this.project, this.entityName, subFolder);
    this.templateData = {
      entityName    : this.entityName,
      fileName      : this.parsedPath.name,
      classifiedName: StringUtils.classify(this.parsedPath.name),
      camelizedName : StringUtils.camelize(this.parsedPath.name, true)
    };

    this.pathToAppModule = ModuleUtils.findAppModule(this.project, this.parsedPath.dir);
    this.pathToModule = ModuleUtils.findParentModule(this.project, this.parsedPath.dir);
  }

  /**
   * Get entry files
   *
   * @returns {Array<String>}
   */
  getFiles () {
    if (fs.existsSync(this.filesPath)) {
      return this.files.map((file) => `__path__/${file}`);
    }

    return [];
  }

  beforeInstall () {
    return new Promise((resolve) => resolve());
  }

  /**
   * Install an entity
   *
   * 1) Create the output folder
   *
   * For each entity file:
   * 2) Retrieve it's content
   * 3) Render it's content with EJS
   * 4) Write all files into the output folder
   *
   * @returns {Promise}
   */
  install () {
    return new Promise((resolve) => {
      this._log(`installing ${this.type}`);

      if (!fs.existsSync(this.parsedPath.entityPath)) {
        fs.mkdirSync(this.parsedPath.entityPath);
      }

      this.getFiles().forEach((file) => {
        let templateString = fs.readFileSync(file.replace('__path__', this.filesPath), 'utf-8');
        let renderedString = ejs.render(templateString, this.templateData);

        let filePath = file.replace('__path__', this.parsedPath.entityPath).replace('__name__', this.parsedPath.name);
        let exists = fs.existsSync(filePath);

        if (!exists) {
          fs.writeFileSync(filePath, renderedString);
        }

        this._log(`  ${exists ? chalk.yellow('IDENTICAL') : chalk.green('CREATE')} ${file.replace('__path__', this.parsedPath.entityDir).replace('__name__', this.parsedPath.name)}`);
      });

      resolve();
    });
  }

  afterInstall () {
    return new Promise((resolve) => resolve());
  }

  /**
   * Register application module and parent module information in template data
   *
   * @param   {boolean} [appOnly=false] We just want to register the app module and not the closest parent module
   * @returns {Promise}
   */
  registerModuleTemplateData (appOnly = false) {
    return new Promise((resolve) => {
      let { modulePath: appModulePath, moduleName: appModuleName } = this._moduleInfo(this.pathToAppModule);
      let { modulePath, moduleName } = this._moduleInfo(this.pathToModule);

      if (appOnly) {
        this.templateData = Object.assign(this.templateData, {
          appModulePath: appModulePath,
          appModuleName: appModuleName,
        });
      } else {
        this.templateData = Object.assign(this.templateData, {
          appModulePath: (this.pathToAppModule === this.pathToModule) ? null : appModulePath,
          appModuleName: (this.pathToAppModule === this.pathToModule) ? null : appModuleName,
          modulePath   : modulePath,
          moduleName   : moduleName
        });
      }

      resolve();
    });
  }

  /**
   * Export for "class likes" afterInstall process (service, component, directive, ...).
   * It's added kind of the same way inside the parent module.
   *
   * @param   {{entityName?: string, type?: string}}  data  Override some of the default options
   * @returns {Promise}
   */
  classStyleAfterInstall (data = {}) {
    return new Promise((resolve) => {
      let type = data.type || this.type,
        module = fs.readFileSync(this.pathToModule, 'utf8'),
        fullName = `${this.templateData.classifiedName}${StringUtils.classify(type)}`,
        fileName = `${this.parsedPath.name}.${type}`,
        entityName = data.entityName || this.parsedPath.name,
        componentDir = DynamicPathParser.relative(path.dirname(this.pathToModule), this.parsedPath.entityPath),
        importPath = componentDir ? `./${componentDir}/${fileName}` : `./${fileName}`;

      // Complete the module
      module = ModuleUtils.addImportToModule(module, fullName, importPath, true);
      module = ModuleUtils.addDeclarationToModule(module, fullName, entityName, type);

      ModuleUtils.writeModuleFile(this.pathToModule, module);

      this._log(`  ${chalk.yellow('update')} ${DynamicPathParser.relative(this.project.root, this.pathToModule)}`);

      resolve();
    });
  }

  _moduleInfo (pathToModule) {
    let moduleFileName = path.basename(pathToModule, '.ts'),
      moduleDir = DynamicPathParser.relative(this.parsedPath.entityPath, path.dirname(pathToModule)),
      modulePath = moduleDir ? `${moduleDir}/${moduleFileName}` : `./${moduleFileName}`;

    return {
      modulePath: modulePath,
      moduleName: ModuleUtils.getModuleName(pathToModule)
    };
  }

  _log (message, type = 'pop') {
    if (!this.options.quiet) {
      switch (type) {
        case 'info':
          logger.info(message);
          break;

        case 'pop':
        default:
          logger.pop(message);
          break;
      }
    }
  }

}

Blueprints.types = [ 'component', 'directive', 'filter', 'service', 'module' ];

module.exports = Blueprints;
