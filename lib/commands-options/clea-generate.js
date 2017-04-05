const chalk = require('chalk');

const options = [{
  option: '--with-component',
  doc: `generate a component with the generated module. Only for ${chalk.blue('module')} blueprint.`
}, {
  option: '--lazy-load',
  doc: `lazy load the module in the closest parent routing file. Only for ${chalk.blue('module')} blueprint.`
}];

module.exports.options = options;
