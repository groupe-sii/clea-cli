const Blueprints = require('../blueprints');

class ServiceBlueprint extends Blueprints {

  constructor (blueprint, entityName, options) {
    super(blueprint, entityName, options);

    this.type = 'service';
    this.files = [
      '__name__.service.ts'
    ];

    if (this.project.clea.spec && this.project.clea.spec.service) {
      this.files.push('__name__.service.spec.ts');
    }
  }

  beforeInstall () {
    return this.registerModuleTemplateData();
  }

  afterInstall () {
    return this.classStyleAfterInstall({
      entityName: `${this.templateData.camelizedName}Service`
    });
  }

}

module.exports = ServiceBlueprint;
