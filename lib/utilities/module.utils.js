const fs = require('fs'),
  path = require('path'),
  os = require('os');

class ModuleUtils {

  /**
   * Look for the app module
   *
   * @param   {Project} project   Project
   * @param   {string}  dir       Where to start ?
   * @return  {string}            Path to the module
   */
  static findAppModule (project, dir) {
    return ModuleUtils._findParent(project, dir, 'app.module.ts');
  }

  /**
   * Look for the closest module
   *
   * @param   {Project} project   Project
   * @param   {string}  dir       Where to start ?
   * @return  {string}            Path to the module
   */
  static findParentModule (project, dir) {
    return ModuleUtils._findParent(project, dir, '.module.ts');
  }

  /**
   * Look for the closest routing
   *
   * @param   {Project} project   Project
   * @param   {string}  dir       Where to start ?
   * @return  {string}            Path to the module
   */
  static findParentRouting (project, dir) {
    return ModuleUtils._findParent(project, dir, '.routing.ts');
  }

  /**
   * Add an entity import to the module
   *
   * ```javascript
   * // import name from 'importPath';
   * import { AppComponent } from './app.component';
   * ```
   *
   * @param {string}  module          Content of the module file
   * @param {string}  name            Import name
   * @param {string}  importPath      Path to the entity to import (relative to the module path)
   * @param {boolean} brackets        Surround the import with brackets ?
   */
  static addImportToModule (module, name, importPath, brackets = false) {
    name = (brackets) ? `{ ${name} }` : name;

    let importPart = `import ${name} from '${importPath}';`,
      match = module.match(ModuleUtils.ADD_IMPORT_REGEXP);

    if (match === undefined || match === null) {
      throw new Error('Unable to add the import declaration, the module file must be misformatted');
    }

    return `${match[1]}${match[2]}${os.EOL}${importPart}${match[3]}`;
  }

  /**
   * Add an entity declaration to the module
   *
   * Expected result:
   * ```javascript
   * // module.entityType(entityName, camelizedName);
   * module.component('app', appComponent);
   * module.service('AppService', AppService);
   * ``̀
   *
   * @param   {string}            module        Content of the module file
   * @param   {string}            camelizedName Camelized name
   * @param   {string}            entityName    Name of the entity
   * @param   {Blueprints.types}  entityType    A known entity type
   * @return  {string}
   */
  static addDeclarationToModule (module, camelizedName, entityName, entityType) {
    let declarationPart = `module.${entityType}('${entityName}', ${camelizedName});`,
      match = module.match(ModuleUtils.ADD_DECLARATION_REGEXP);

    if (match === undefined || match === null) {
      throw new Error('Unable to add declaration, the module file must be misformatted');
    }

    return `${match[1].trim()}${os.EOL}${declarationPart}${os.EOL}${os.EOL}${match[2]}`;
  }

  /**
   * Add a $stateProvider declaration to the routing
   *
   * @param {string}            routing         Content of the routing file
   * @param {string}            dasherizedName
   * @param {string}            classifiedName
   * @param {string}            modulePath
   * @param {string|undefined}  component
   */
  static addDeclarationToRouting (routing, dasherizedName, classifiedName, modulePath, component) {
    let match = routing.match(ModuleUtils.ADD_STATE_PROVIDER_REGEXP),
      componentPart = (component === undefined) ? '' : `,
      component: '${component}'`,
      declarationPart = `
    $stateProvider.state('${dasherizedName}', {
      url: '/${dasherizedName}'${componentPart},
      resolve: {
        module: ['$q', '$ocLazyLoad', ($q: ng.IQService, $ocLazyLoad: oc.ILazyLoad) => {
        
          return $q ((resolve) => {
            (<WebpackRequire> require).ensure([], () => {
              let { ${classifiedName}Module } = require('${modulePath}');

              $ocLazyLoad.load({
                name : ${classifiedName}Module,
                files: undefined
              });

              resolve(module);
            });
          });
        }]
      }
    });`;

    if (match === undefined || match === null) {
      throw new Error('Unable to add the state provider declaration, the module file must be misformatted');
    }

    return `${match[1]}${match[2]}${os.EOL}${declarationPart}${match[3]}`;
  }

  /**
   * Read the module to find it's name
   *
   * @param   {string}  modulePath
   * @return  {string}
   */
  static getModuleName (modulePath) {
    let module = fs.readFileSync(modulePath, 'utf8'),
      match = module.match(ModuleUtils.MODULE_NAME);

    if (match === undefined || match === null) {
      throw new Error(`Unable to retrieve the module name for ${modulePath}, the file must be misformatted`);
    }

    return match[1];
  }

  /**
   * Write the content of the module onto it's destination path
   *
   * @param {string}  modulePath
   * @param {string}  module
   */
  static writeModuleFile (modulePath, module) {
    fs.writeFileSync(modulePath, module);
  }

  /**
   * Write the content of the routing file onto it's destination path
   *
   * @param {string}  routingPath
   * @param {string}  routing
   */
  static writeRoutingFile (routingPath, routing) {
    fs.writeFileSync(routingPath, routing);
  }

  static _findParent (project, dir, pattern) {
    let sourceRoot = path.join(project.root, project.clea.root, 'app'),
      pathToCheck = path.join(project.root, dir);

    while (pathToCheck.length >= sourceRoot.length) {
      let files = fs.readdirSync(pathToCheck)
        .filter((file) => file.endsWith(pattern))
        .filter((file) => fs.statSync(path.join(pathToCheck, file)).isFile());

      if (files.length === 1) {
        return path.join(pathToCheck, files[0]);
      } else if (files.length > 1) {
        throw new Error(`Multiple module files found under "${pathToCheck.replace(sourceRoot, '')}"`);
      }

      // Move to parent directory
      pathToCheck = path.dirname(pathToCheck);
    }

    throw new Error('No module files found');
  }

}

ModuleUtils.ADD_IMPORT_REGEXP = /^([\s\S]*)(import.*?;)([\s\S]*)$/;
ModuleUtils.ADD_DECLARATION_REGEXP = /([\s\S]*)(export const[\s\S]*)$/;
ModuleUtils.ADD_STATE_PROVIDER_REGEXP = /^([\s\S]*)(stateProvider[\s\S]*;)([\s\S]*)$/;
ModuleUtils.MODULE_NAME = /export const (.*?) =/;

module.exports = ModuleUtils;
