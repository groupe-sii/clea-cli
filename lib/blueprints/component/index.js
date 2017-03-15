const Blueprints = require('../blueprints'),
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

    this.pathToModule = ModuleUtils.findParentModule(this.project, this.parsedPath.dir);
    this.templateData = Object.assign(this.templateData, {
      fileName      : this.parsedPath.name
    });
  }

  afterInstall () {
    return super.classStyleAfterInstall({
      entityName: StringUtils.camelize(this.parsedPath.name, true)
    });
  }

}

module.exports = ComponentBlueprint;
