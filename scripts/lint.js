const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const match = require('minimatch');

const LINT_PATTERN = [
  'packages/*/src/**/*.js',
  'examples/**/*.js'
];

const logger = {
  info(...args) {
    console.log(...args);
  },
  warn(...args) {
    console.warn(...args);
  },
  error(...args) {
    console.error(...args);
  }
};
const pwd = path.join(__dirname, '../');

function getDiffIndexMatches() {
  return new Promise(resolve => {
    cp.exec('git diff-index --cached --name-only HEAD', (err, stdout) => {
      logger.info('已成功开启增量检查');

      if (err) {
        if (err.toString().indexOf('unknown revision') > -1) {
          logger.error('当前仓库还没有任何commit记录，增量检查模式将失效');
          resolve();
        } else {
          logger.error('增量检查发生未知错误');
          process.exit(1);
        }
        return;
      }

      const output = stdout.trim();

      if (!output) {
        return resolve([]);
      }

      const diffIndexMatches = output.split('\n').filter(file => {
        const fullPath = path.join(pwd, file);
        const exists = fs.existsSync(fullPath);

        if (exists) {
          logger.info('文件变更 - ' + fullPath);
        } else {
          logger.warn('文件删除 - ' + fullPath);
        }

        return exists;
      });

      resolve(diffIndexMatches);
    });
  });
}

getDiffIndexMatches().then((files) => {
  const lintFiles = files.filter(file => LINT_PATTERN.some(pattern => match(file, pattern)));
  console.log(lintFiles);
});
