const options = [{
  option: '-v, --verbose',
  doc: 'verbose mode'
}, {
  option: '--lib',
  doc: 'generate a library instead of an application'
}, {
  option: '--ui-framework [framework]',
  doc: 'create application with built-in ui framework. "material" or "bootstrap" (defaults to: none)'
}, {
  option: '--make-it-progressive',
  doc: 'add the default configuration for a Progressive Web App (defaults to: false)'
}, {
  option: '--skip-install',
  doc: 'skip installing packages (defaults to: false)'
}, {
  option: '--skip-git',
  doc: 'skip initializing a git repository (defaults to: false)'
}, {
  option: '--commit-message-conventions',
  doc: 'add commit-msg hook to force use of the Google message conventions (defaults to: false)'
}];

module.exports.name = 'init';
module.exports.options = options;
