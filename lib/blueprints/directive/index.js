const Blueprints = require('../blueprints'),
  ModuleUtils = require('../../utilities/module.utils'),
  StringUtils = require('../../utilities/string.utils');

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
      entityName: StringUtils.camelize(this.parsedPath.name)
    });
  }

}

module.exports = DirectiveBlueprint;
