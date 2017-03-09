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

    this.pathToModule = ModuleUtils.findParentModule(this.project, this.parsedPath.dir);
  }

  afterInstall () {
    return super.classStyleAfterInstall({
      entityName: StringUtils.camelize(this.parsedPath.name)
    });
  }

}

module.exports = FilterBlueprint;
