const path = require('path'),

  Blueprints = require('../blueprints'),
  DynamicPathParser = require('../../utilities/dynamic-path-parser'),
  StringUtils = require('../../utilities/string.utils'),
  ModuleUtils = require('../../utilities/module.utils');

class ComponentBlueprint extends Blueprints {

  constructor (blueprint, entityName, options) {
    super(blueprint, entityName, options, true);

    this.type = 'component';
    this.files = [
      '__name__.component.html',
      '__name__.component.scss',
      '__name__.component.spec.ts',
      '__name__.component.ts',
      '__name__.controller.ts'
    ];

    this.pathToAppModule = ModuleUtils.findAppModule(this.project, this.parsedPath.dir);
    this.pathToModule = ModuleUtils.findParentModule(this.project, this.parsedPath.dir);
    this.templateData = Object.assign(this.templateData, {
      fileName     : this.parsedPath.name,
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

module.exports = ComponentBlueprint;
