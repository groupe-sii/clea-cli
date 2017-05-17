const karmaConfig = require('@clea/cli/lib/models/karma-configs/karma.app.conf.js');

module.exports = function (config) {
  const finalKarmaConfig = karmaConfig(config);

  // You can add your own config here

  config.set(finalKarmaConfig);

};
