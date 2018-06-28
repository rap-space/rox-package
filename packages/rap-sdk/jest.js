
global.rapcaller = function() {
  const moduleName = this;
  const [ method, params, success, fail, notify ] = arguments;

  // 路由导航模块模拟
  if (moduleName === 'navigator') {
    if (method === 'pop') {
      success(JSON.stringify({
        name: moduleName,
        method,
        params,
      }));
    } else if (method === 'push') {
      success(JSON.stringify({
        name: moduleName,
        method,
        params,
      }));
    }

  // MTOP 请求模块模拟
  } else if (moduleName === 'mtop') {
    if (method === 'request') {
      success(JSON.stringify({
        code: 'RAP_SUCCESS',
        data: JSON.stringify({
          ret: [
            'SUCCESS::b::c',
          ],
          data: {
            success: true,
            result: {
              method,
              params,
            }
          }
        })
      }));
    }
  } else {
    console.log(`jest.js global repcaller: ${this} is not found.`);
  }
};

global.fetch = (url, options) => {
  console.log(`fetch url: ${url} options: ${options}`);
};

global.require = name => {
  console.log(`global.require ${name}`);
};

global.window.require = name => {
  console.log(`window.require ${name}`);
};

jest.mock('./src/env');
jest.mock('./src/rap/weex-module');

const sleep = x => new Promise(resolve => setTimeout(resolve, x));

export default {
  sleep,
};
