const options = [{
  option: '-v, --verbose',
  doc: 'verbose mode'
}, {
  option: '--target [env]',
  doc: 'build the application with the targeted environment (defaults to: development)'
}, {
  option: '--output-path [path]',
  doc: 'build the application into this path (defaults to: dist/)'
}, {
  option: '--base-href [url]',
  doc: 'base url for the application being built (defaults to: /)'
}, {
  option: '--compress',
  doc: 'enable gzip compression'
}, {
  option: '--sourcemap',
  doc: 'output sourcemaps'
}, {
  option: '--doc',
  doc: 'generate the documentation'
}, {
  option: '--progress',
  doc: 'display a compilation progress'
}, {
  option: '--merge-config [config]',
  doc: 'merge the given webpack configuration with the existing one'
}, {
  option: '--override-config [config]',
  doc: 'override the existing webpack configuration by the given one'
}];

module.exports.options = options;
