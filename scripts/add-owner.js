'use strict';

const match = require('minimatch');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

const PACKAGE_PATTERN = 'rox-*';
const PACKAGES_DIR = path.resolve(__dirname, '../packages');
const user = process.argv[2];

fs.readdirSync(PACKAGES_DIR).forEach(function(packageName) {
  const packageJSON = require(path.join(PACKAGES_DIR, packageName, 'package.json'));
  const matched = match(packageName, PACKAGE_PATTERN);

  if (!matched && packageJSON.private) {
    return console.log('Skip private package:', packageName);
  }

  exec(
    'npm owner add ' + user + ' ' + packageName,
    {
      stdio: 'inherit'
    },
    (e, stdout, stderr) => {
      //
    }
  );
});
