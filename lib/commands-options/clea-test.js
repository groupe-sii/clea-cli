const options = [{
  option: '--watch',
  doc: 'run tests when files change'
}, {
  option: '--single-run',
  doc: 'run tests only once'
}, {
  option: '--log-level [level]',
  doc: 'level of logging (defaults to: info)',
  default: 'info'
}, {
  option: '--port [port]',
  doc: 'port where the web server will be listening (defaults to: 9876)',
  default: 9876
}];

module.exports.name = 'test';
module.exports.options = options;
