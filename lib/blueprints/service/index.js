const path = require('path'),

  Blueprints = require('../blueprints'),
  StringUtils = require('../../utilities/string.utils'),
  DynamicPathParser = require('../../utilities/dynamic-path-parser'),
  ModuleUtils = require('../../utilities/module.utils');

class ServiceBlueprint extends Blueprints {

  constructor (blueprint, entityName, options) {
    super(blueprint, entityName, options);

    this.type = 'service';
    this.files = [
      '__name__.service.spec.ts',
      '__name__.service.ts'
    ];

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
        moduleName   : moduleName,
        servicePath  : `./${this.parsedPath.name}.${this.type}`
      });

      resolve();
    });
  }

  afterInstall () {
    return this.classStyleAfterInstall({
      entityName: `${this.templateData.camelizedName}Service`
    });
  }

}

module.exports = ServiceBlueprint;
