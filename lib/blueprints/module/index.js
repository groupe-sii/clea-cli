const chalk = require('chalk'),
  path = require('path'),
  fs = require('fs'),

  Blueprints = require('../blueprints'),
  ModuleUtils = require('../../utilities/module.utils'),
  StringUtils = require('../../utilities/string.utils'),
  DynamicPathParser = require('../../utilities/dynamic-path-parser'),
  logger = require('../../../vendors/logger');

class ModuleBlueprint extends Blueprints {

  constructor (blueprint, entityName, options) {
    super(blueprint, entityName, options, true);

    this.type = 'module';
    this.files = [
      '__name__.module.ts'
    ];

    if (this.options.component) {
      this.files = this.files.concat([
        '__name__.component.html',
        '__name__.component.scss',
        '__name__.component.ts',
        '__name__.controller.ts'
      ]);

      if (this.project.clea.spec && this.project.clea.spec.module) {
        this.files.push('__name__.component.spec.ts');
      }
    }

    this.templateData = Object.assign(this.templateData, {
      dasherizedName: StringUtils.dasherize(this.parsedPath.name)
    });
  }

  beforeInstall () {
    return this.registerModuleTemplateData(true);
  }

  afterInstall () {
    let defer = Promise.resolve(),
      pathToRouting;

    // Let's add the component in it's module
    if (this.options.component) {

      // Path to the newly created module (and not it's parent module)
      this.pathToModule = ModuleUtils.findParentModule(this.project, path.join(this.parsedPath.dir, this.parsedPath.name));

      defer = this.classStyleAfterInstall({
        type: 'component'
      });
    }

    // Let's lazy load the new module in the parent routing file
    if (this.options.lazyLoad) {
      pathToRouting = ModuleUtils.findParentRouting(this.project, this.parsedPath.dir);

      let routing = fs.readFileSync(pathToRouting, 'utf8'),
        fileName = `${this.parsedPath.name}.${this.type}`,
        moduleDir = DynamicPathParser.relative(path.dirname(pathToRouting), this.parsedPath.entityPath),
        modulePath = moduleDir ? `./${moduleDir}/${fileName}` : `./${fileName}`;

      routing = ModuleUtils.addDeclarationToRouting(routing, this.templateData.dasherizedName, this.templateData.classifiedName, modulePath, (this.options.component) ? this.parsedPath.name : undefined);

      ModuleUtils.writeRoutingFile(pathToRouting, routing);

      this._log(`  ${chalk.yellow('update')} ${DynamicPathParser.relative(this.project.root, pathToRouting)}`);
    }

    return defer
      .then(() => {
        if (this.options.lazyLoad) {
          this._log(`  ${chalk.green('INFO')} Module is lazy loaded in the ${DynamicPathParser.relative(this.project.root, pathToRouting)} routing file`);
        } else {
          this._log(`  ${chalk.yellow('WARNING')} Module is generated but not registered, it must be registered to be used`);
        }

        return true;
      });
  }

}

module.exports = ModuleBlueprint;
