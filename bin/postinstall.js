#!/usr/bin/env node

const fs = require('fs-extra'),
  logger = require('../vendors/logger');

fs.copy('./node_modules/@clea/cli/lib/models/git-configs/commit-msg.js', '.git/hooks/commit-msg', (err) => {
  if (err) {
    return logger.error(err);
  }

  fs.chmod('.git/hooks/commit-msg', '755', (err) => {
    if (err) {
      return logger.error(err);
    }
  });
});
