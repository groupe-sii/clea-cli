const options = [{
  option: '--browsers [browsers]',
  doc: 'override which browsers tests are run against'
}, {
  option: '--progress [progress]',
  doc: 'log progress to the console while building (defaults to true)'
}, {
  option: '--single-run',
  doc: 'karma will exit once all tests are passed or any tests failed'
}, {
  option: '--watch',
  doc: 'run tests when files change'
}];

module.exports.name = 'test';
module.exports.options = options;
