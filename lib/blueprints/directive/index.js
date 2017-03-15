const Blueprints = require('../blueprints'),
  StringUtils = require('../../utilities/string.utils'),
  ModuleUtils = require('../../utilities/module.utils');

class DirectiveBlueprint extends Blueprints {

  constructor (blueprint, entityName, options) {
    super(blueprint, entityName, options);

    this.type = 'directive';
    this.files = [
      '__name__.directive.ts'
    ];

    this.pathToModule = ModuleUtils.findParentModule(this.project, this.parsedPath.dir);
  }

  afterInstall () {
    return super.classStyleAfterInstall({
      entityName: StringUtils.camelize(this.parsedPath.name, true)
    });
  }

}

module.exports = DirectiveBlueprint;
