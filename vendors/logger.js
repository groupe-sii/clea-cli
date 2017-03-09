const winston = require('winston'),
  chalk = require('chalk');

module.exports = new (winston.Logger)({
  level    : 'pop',
  levels   : {
    error  : 0,
    warning: 1,
    info   : 2,
    debug  : 3,
    help   : 4,
    pop    : 5
  },
  transports: [
    new (winston.transports.Console)({
      formatter: (options) => {
        return getColorFromLevel(options.level)(options.message);
      }
    })
  ]
});

function getColorFromLevel (level) {
  return {
    error  : chalk.red,
    warning: chalk.yellow,
    info   : chalk.green,
    debug  : chalk.blue,
    help   : (val) => val,
    pop    : (val) => val
  }[ level ];
}
