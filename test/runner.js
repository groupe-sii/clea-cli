const Mocha = require('mocha'),
  glob = require('glob');

let specFiles = glob.sync('test/**/*.spec.js');

let mocha = new Mocha({
  timeout: 5000,
  reporter: 'spec'
});

specFiles.forEach(mocha.addFile.bind(mocha));

mocha.run((failures) => {
  process.on('exit', () => {
    process.exit(failures);
  });
});
