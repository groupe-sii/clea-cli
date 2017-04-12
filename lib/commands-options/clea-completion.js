const options = [{
  option: '-z, --zsh',
  doc: 'generate zsh config'
}, {
  option: '-b, --bash',
  doc: 'generate bash config'
}];

module.exports.name = 'completion';
module.exports.options = options;
