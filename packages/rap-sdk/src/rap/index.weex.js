import { defer } from '../util';
import {requireModule} from './weex-module';

let RBridge;
let MODULE_NAME = '@weex-module/rapcaller';
let call = function(options, callback) {
  let className = options.className;
  let methodName = options.methodName;
  // 支持两种， 这里暂时写param
  let params = options.options || options.param;
  if (!RBridge) {
    RBridge = requireModule('rapcaller');
  }

  let deferred = defer();
  RBridge.call && RBridge.call(className, methodName, params, function(success) {
    success = JSON.stringify(success);
    deferred.resolve(success);
  }, function(error) {
    error = JSON.stringify(error);
    console.error('rapcaller.call:: ' + `[${className}.${methodName}]--failure, \n message:: ${error}`);
    deferred.reject(error);
  }, function(notify) {
    // 这里可以修复一些参数处理
    callback && callback(notify);
  });
  return deferred.promise;
};

export default {
  call,
  invoke: call,
  requireModule
};
