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

    if (this.project.clea.spec && this.project.clea.spec.directive) {
      this.files.push('__name__.directive.spec.ts');
    }

    this.pathToModule = ModuleUtils.findParentModule(this.project, this.parsedPath.dir);
  }

  beforeInstall () {
    return this.registerModuleTemplateData();
  }

  afterInstall () {
    return super.classStyleAfterInstall({
      entityName: this.templateData.camelizedName
    });
  }

}

module.exports = DirectiveBlueprint;
