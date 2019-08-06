const Blueprints = require('../blueprints');

class ComponentBlueprint extends Blueprints {

  constructor (blueprint, entityName, options) {
    super(blueprint, entityName, options, true);

    this.type = 'component';
    this.files = [
      '__name__.component.html',
      '__name__.component.scss',
      '__name__.component.ts'
    ];

    if (this.project.clea.spec && this.project.clea.spec.component) {
      this.files.push('__name__.component.spec.ts');
    }

    this.templateData = Object.assign(this.templateData, {
      fileName: this.parsedPath.name
    });
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

module.exports = ComponentBlueprint;
