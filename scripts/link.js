'use strict';

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const PACKAGES_DIR = path.resolve(__dirname, '../packages');

function getPackages() {
  return fs.readdirSync(PACKAGES_DIR)
    .map(f => path.resolve(PACKAGES_DIR, f))
    .filter(f => fs.lstatSync(f).isDirectory());
}

const linkSkipPackages = [
  // 'babel-preset-rax',
  // 'babel-plugin-transform-jsx-stylesheet',
  // 'rax-scripts'
];

getPackages().forEach((p) => {
  // Skip link starter kit
  if (linkSkipPackages.some(skipPackage => p.endsWith(skipPackage))) {
    return;
  };
  const linkArgv = ['link', p];
  // Skip install devDependencies
  // if (p.endsWith('rax-test-renderer')) linkArgv.push('--production');
  // if (p.endsWith('rax-components')) linkArgv.push('--production');
  console.log('npm', linkArgv.join(' '));

  exec('npm ' + linkArgv.join(' '), (e) => {
    if (e) {
      console.log(e);
    }
  });
});
