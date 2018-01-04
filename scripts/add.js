const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs-extra');

const PACKAGES_DIR = path.join(__dirname, '../packages');
const TEMPLATE_PACKAGE_DIR = path.join(__dirname, '../templates/package');


const EXAMPLES_DIR = path.join(__dirname, '../examples');
const TEMPLATE_EXAMPLE_DIR = path.join(__dirname, '../templates/example');

function copyTo(dir, dest, paths, filter) {
  const files = fs.readdirSync(dir);

  files.forEach((name) => {
    const fileName = path.join(dir, name);
    const stats = fs.statSync(fileName);

    if (stats.isDirectory()) {
      paths.push(name);

      return copyTo(fileName, dest, paths, filter);
    }

    const destPath = path.join(dest, ...paths, name);

    fs.copySync(fileName, destPath, {
      overwrite: true
    });

    if (filter) {
      const content = fs.readFileSync(destPath, 'utf-8');
      const filteredContent = filter(content);

      fs.writeFileSync(destPath, filteredContent);
    }
  });
}

inquirer.prompt([{
  type: 'input',
  name: 'name',
  message: '请输入新建组件的名字',
  validate: (val) => !!val
}]).then((answer) => {
  const componentName = answer.name;
  const componentDir = path.join(PACKAGES_DIR, componentName);

  const componentExampleDir = path.join(EXAMPLES_DIR, componentName);

  if (fs.existsSync(componentDir) || fs.existsSync(componentExampleDir)) {
    console.error(`组件 ${componentName} 已存在！`);
    return process.exit(1);
  }

  fs.ensureDirSync(componentDir);
  fs.ensureDirSync(componentExampleDir);

  copyTo(TEMPLATE_PACKAGE_DIR, componentDir, [], (content) => {
    return content.replace(/\{\{name\}\}/g, componentName);
  });

  copyTo(TEMPLATE_EXAMPLE_DIR, componentExampleDir, [], (content) => {
    return content.replace(/\{\{name\}\}/g, componentName);
  });

  console.log(`组件 ${componentName} 已创建！`);
  console.log(`组件 ${componentName} example 已创建！`);
}).catch(e => {
}).catch(e => {
  console.log(e.stack);
});
