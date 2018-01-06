import { defer } from './util';

let RBridge;
let call = function(options, callback) {
  let className = options.className;
  let methodName = options.methodName;

  // 支持两种， 这里暂时写param
  let params = options.options || options.param;
  if (!RBridge) {
    RBridge = window.require('@weex-module/rapcaller');
  }
  let deferred = defer();

  RBridge.call(className, methodName, params, function(success) {
    console.log('rapcaller.call: ' + `[${className}.${methodName}]--success, message${success}`);
    deferred.resolve(success);
  }, function(error) {
    console.log('rapcaller.call: ' + `[${className}.${methodName}]--failure, message: ${error}`);
    deferred.reject(error);
  }, function(notify) {
    // console.log('notify:' + notify);
    // 这里可以修复一些参数处理
    callback && callback(notify);
  });
  return deferred.promise;
};

export default {
  call
};