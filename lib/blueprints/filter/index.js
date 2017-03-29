const Blueprints = require('../blueprints'),
  StringUtils = require('../../utilities/string.utils'),
  ModuleUtils = require('../../utilities/module.utils');

class FilterBlueprint extends Blueprints {

  constructor (blueprint, entityName, options) {
    super(blueprint, entityName, options);

    this.type = 'filter';
    this.files = [
      '__name__.filter.ts'
    ];

    if (this.project.clea.spec && this.project.clea.spec.filter) {
      this.files.push('__name__.filter.spec.ts');
    }

    this.pathToAppModule = ModuleUtils.findAppModule(this.project, this.parsedPath.dir);
    this.pathToModule = ModuleUtils.findParentModule(this.project, this.parsedPath.dir);
    this.templateData = Object.assign(this.templateData, {
      camelizedName: StringUtils.camelize(this.parsedPath.name, true)
    });
  }

  beforeInstall () {
    return new Promise((resolve) => {
      let { modulePath: appModulePath, moduleName: appModuleName } = this._moduleInfo(this.pathToAppModule);
      let { modulePath, moduleName } = this._moduleInfo(this.pathToModule);

      this.templateData = Object.assign(this.templateData, {
        appModulePath: (this.pathToAppModule === this.pathToModule) ? null : appModulePath,
        appModuleName: (this.pathToAppModule === this.pathToModule) ? null : appModuleName,
        modulePath   : modulePath,
        moduleName   : moduleName
      });

      resolve();
    });
  }

  afterInstall () {
    return super.classStyleAfterInstall({
      entityName: StringUtils.camelize(this.parsedPath.name, true)
    });
  }

}

module.exports = FilterBlueprint;
