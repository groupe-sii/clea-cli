const inquirer = require('inquirer'),
  path = require('path'),

  Blueprints = require('../blueprints'),
  StringUtils = require('../../utilities/string.utils'),
  DynamicPathParser = require('../../utilities/dynamic-path-parser'),
  ModuleUtils = require('../../utilities/module.utils');

class ServiceBlueprint extends Blueprints {

  constructor (blueprint, entityName, options) {
    super(blueprint, entityName, options);

    this.type = 'service';
    this.files = [
      '__name__.service.spec.ts',
      '__name__.service.ts'
    ];

    this.pathToModule = ModuleUtils.findParentModule(this.project, this.parsedPath.dir);
    this.prompt = inquirer.createPromptModule();
    this.templateData = Object.assign(this.templateData, {
      camelizedName: StringUtils.camelize(this.parsedPath.name, true)
    });
  }

  beforeInstall () {
    return new Promise((resolve) => {
      this.prompt([ {
        name   : 'withResource',
        type   : 'list',
        message: 'Will this service be used to call a specific URL ?',
        default: 'no',
        choices: [
          {
            name : 'No, just an empty service',
            value: 'no'
          },
          {
            name : 'Yes, let\'s fulfill this URL',
            value: 'yes'
          }
        ]
      }, {
        when   : (response) => response.withResource === 'yes',
        name   : 'resource',
        type   : 'inout',
        message: 'What is the base URL ?'
      }]).then((res) => {
        let resource;

        if (res.resource !== undefined && res.resource !== null && res.resource !== '') {
          resource = (res.resource.startsWith('/')) ? res.resource.slice(1) : res.resource;
          resource = (resource.length === 0) ? undefined : resource;
        }

        let moduleName = path.basename(this.pathToModule, '.ts'),
          moduleDir = DynamicPathParser.relative(this.parsedPath.entityPath, path.dirname(this.pathToModule)),
          modulePath = moduleDir ? `${moduleDir}/${moduleName}` : `./${moduleName}`;

        this.templateData = Object.assign(this.templateData, {
          resource   : resource,
          resourceVar: (resource) ? StringUtils.camelize(resource, true) : undefined,
          modulePath : modulePath,
          moduleName : ModuleUtils.getModuleName(this.pathToModule),
          servicePath: `./${this.parsedPath.name}.${this.type}`
        });

        resolve();
      });
    });
  }

  afterInstall () {
    return this.classStyleAfterInstall({
      entityName: `${this.templateData.camelizedName}Service`
    });
  }

}

module.exports = ServiceBlueprint;
