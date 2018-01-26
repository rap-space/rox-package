import { defer } from '../util';
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

  const deferred = defer();

  RBridge.call && RBridge.call(className, methodName, params, (success) => {
    success = JSON.stringify(success);
    deferred.resolve(success);
  }, (error) => {
    error = JSON.stringify(error);
    console.error('rapcaller.call:: ' + `[${className}.${methodName}]--failure, \n message:: ${error}`);
    deferred.reject(error);
  }, (notify) => {
    callback && callback(notify);
  });

  return deferred.promise;
};

export default {
  call,
  invoke: call,
  requireModule
};
