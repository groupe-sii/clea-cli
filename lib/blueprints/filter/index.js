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
  }

  beforeInstall () {
    return this.registerModuleTemplateData();
  }

  afterInstall () {
    return super.classStyleAfterInstall({
      entityName: StringUtils.camelize(this.parsedPath.name, true)
    });
  }

}

module.exports = FilterBlueprint;
