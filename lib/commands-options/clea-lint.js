const options = [{
  option: '--fix',
  doc: 'will attempt to fix lint errors'
}, {
  option: '--force',
  doc: 'will always return error code 0 even with lint errors. It also launches all linters, whether there is errors or not.'
}];

module.exports.options = options;
