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

    this.pathToModule = ModuleUtils.findParentModule(this.project, this.parsedPath.dir);
    this.templateData = Object.assign(this.templateData, {
      camelizedName: StringUtils.camelize(this.parsedPath.name, true)
    });
  }

  beforeInstall () {
    return new Promise((resolve) => {
      let moduleName = path.basename(this.pathToModule, '.ts'),
        moduleDir = DynamicPathParser.relative(this.parsedPath.entityPath, path.dirname(this.pathToModule)),
        modulePath = moduleDir ? `${moduleDir}/${moduleName}` : `./${moduleName}`;

      this.templateData = Object.assign(this.templateData, {
        modulePath : modulePath,
        moduleName : ModuleUtils.getModuleName(this.pathToModule),
        servicePath: `./${this.parsedPath.name}.${this.type}`
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
