import { requireModule } from './weex-module';

const MODULE_NAME = '@weex-module/rapcaller';
let RBridge = window.RBridge;

function call(options, callback) {
  const { className, methodName } = options;
  // 支持两种， 这里暂时写param
  const params = options.options || options.param;

  if (!RBridge) {
    RBridge = requireModule('rapcaller');
  }

  return new Promise((resolve, reject) => {
    RBridge.call && RBridge.call(className, methodName, params, (success) => {
      success = JSON.stringify(success);
      console.log(`RAP_CALLER_SUCCESS:: [${className}.${methodName}], params: ${JSON.stringify(params)}, success: ${success}}`);
      resolve(success);
    }, (error) => {
      error = JSON.stringify(error);
      console.error('RAP_CALLER_FAILED::' + `[${className}.${methodName}]--failure, \n message:: ${error}`);
      reject(error);
    }, (notify) => {
      console.log(`RAP_CALLER_NOTIFY_SUCCESS:: [${className}.${methodName}], params: ${JSON.stringify(params)}, notify: ${JSON.stringify(notify)}}`);
      callback && callback(notify);
    });
  });
};

export default {
  call,
  invoke: call,
  requireModule
};
