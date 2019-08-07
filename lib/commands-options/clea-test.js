const options = [{
  option: '--watch',
  doc: 'run tests when files change'
}, {
  option: '--single-run',
  doc: 'karma will exit once all tests are passed or any tests failed'
}];

module.exports.name = 'test';
module.exports.options = options;
