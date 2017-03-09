const path = require('path'),
  process = require('process'),
  fs = require('fs'),

  StringUtils = require('./string.utils');

class DynamicPathParser {

  /**
   * Retrieve all the needed path information
   *
   * @param   {Project} project
   * @param   {string}  entityName
   * @param   {boolean} subFolder   Should the entity be generated in a sub-folder or not ?
   * @returns {{root: string, dir: string, base: string, ext: string, baseName: string, name: string, appRoot: string, sourceDir: string, entityDir: string, entityPath: string}}
   */
  static parse (project, entityName, subFolder = false) {
    let projectRoot = project.root,
      sourceDir = project.akg.root,
      appRoot = path.join(sourceDir, 'app'),
      cwd = process.cwd(),
      rootPath = path.join(projectRoot, appRoot),
      outputPath = path.join(rootPath, entityName);

    if (entityName.indexOf(path.sep) === 0) {
      outputPath = path.join(rootPath, entityName.substr(1));
    } else if (cwd.indexOf(rootPath) >= 0) {
      outputPath = path.join(cwd, entityName);
    }

    if (!fs.existsSync(outputPath)) {
      // Verify the path exists on disk.
      let parsedOutputPath = path.parse(outputPath);
      let parts = parsedOutputPath.dir.split(path.sep).slice(1);

      let newPath = parts.reduce((tempPath, part) => {
        let withoutPlus = path.join(tempPath, path.sep, part),
          withPlus = path.join(tempPath, path.sep, '+' + part);

        if (fs.existsSync(withoutPlus)) {
          return withoutPlus;
        } else if (fs.existsSync(withPlus)) {
          return withPlus;
        }

        throw new Error(`Invalid path: "${withoutPlus}" is not a valid path.`);
      }, parsedOutputPath.root);

      outputPath = path.join(newPath, parsedOutputPath.name);
    }

    if (outputPath.indexOf(rootPath) < 0) {
      throw new Error(`Invalid path: "${entityName}" cannot be above the "${appRoot}" directory`);
    }

    let adjustedPath = outputPath.replace(projectRoot, ''),
      parsedPath = path.parse(adjustedPath);

    if (parsedPath.dir.indexOf(path.sep) === 0) {
      parsedPath.dir = parsedPath.dir.substr(1);
    }

    parsedPath.dir = DynamicPathParser.slash(parsedPath.dir === path.sep ? '' : parsedPath.dir);
    parsedPath.appRoot = appRoot;
    parsedPath.sourceDir = sourceDir;
    parsedPath.baseName = parsedPath.name;
    parsedPath.name = StringUtils.dasherize(parsedPath.name, true);
    parsedPath.entityDir = (subFolder) ? path.join(parsedPath.dir, StringUtils.dasherize(parsedPath.base, true)) : parsedPath.dir;
    parsedPath.entityPath = path.join(project.root, parsedPath.entityDir);

    return parsedPath;
  }

  static relative (...args) {
    return DynamicPathParser.slash(path.relative(...args));
  }

  static slash (str) {
    let isExtendedLengthPath = /^\\\\\?\\/.test(str);
    let hasNonAscii = /[^\x00-\x80]+/.test(str);

    if (isExtendedLengthPath || hasNonAscii) {
      return str;
    }

    return str.replace(/\\/g, '/');
  }

}

module.exports = DynamicPathParser;
