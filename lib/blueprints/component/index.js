const Blueprints = require('../blueprints'),
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
    return this.classStyleAfterInstall();
  }

}

module.exports = ComponentBlueprint;
