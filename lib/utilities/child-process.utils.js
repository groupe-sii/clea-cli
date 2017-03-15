const cp = require('child_process');

class ChildProcess {

  static spawn (command, args = [], options = {}) {
    return new Promise ((resolve, reject) => {
      cp.spawn(command, args, options)
        .on('error', (e) => reject(e.stack || e))
        .on('close', (code) => resolve(code));
    });
  }

}

module.exports = ChildProcess;
