const options = [{
  option: '-v, --verbose',
  doc: 'verbose mode'
}, {
  option: '--target [env]',
  doc: 'build the application with the targeted environment (defaults to: development)',
  default: 'development'
}, {
  option: '--host [host]',
  doc: 'host to listen to (defaults to: localhost)',
  default: 'localhost'
}, {
  option: '--port [port]',
  doc: 'the port to serve the application (defaults to: 8080)',
  default: '8080'
}, {
  option: '--base-href [url]',
  doc: 'base url for the application being built (defaults to: /)',
  default: '/'
}, {
  option: '--https',
  doc: 'flag to turn on HTTPS'
}, {
  option: '--progress',
  doc: 'log progress to the console while building'
}, {
  option: '--api [db]',
  doc: 'enable the mock API on the specified database JSON file (defaults to: db.json)'
}, {
  option: '--api-custom-routes [config]',
  doc: 'add custom Express routes (defaults to: api.conf.js)',
  default: 'api.conf.js'
}, {
  option: '--proxy-config [config]',
  doc: 'proxy configuration file'
}, {
  option: '--merge-config [config]',
  doc: 'merge the given webpack configuration with the existing one'
}, {
  option: '--override-config [config]',
  doc: 'override the existing webpack configuration by the given one'
}];

module.exports.name = 'serve';
module.exports.options = options;
