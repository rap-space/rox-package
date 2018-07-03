import { requireModule } from './weex-module';
import { parse2json, logger } from '../util';

const MODULE_NAME = '@weex-module/rapcaller';

let RBridge = window.RBridge;

function call(options, callback) {
  const { className, methodName } = options;
  // 支持两种， 这里暂时写param
  const params = options.options || options.param;
  const timeout = params.timeout || 10000;

  if (!RBridge) {
    RBridge = requireModule('rapcaller');
  }

  return new Promise((resolve, reject) => {
    const callbackTimeout = setTimeout(() => {
      reject(`ERROR. RAP.call timeout. Current timeout is ${timeout}.`);
    }, timeout);

    let notifyCallbackDone = false;
    const notifyCallback = setTimeout(() => {
      notifyCallbackDone = true;
      callback && callback(new Error(`ERROR. RAP.call Notify timeout. Current timeout is ${timeout}.`));
    }, timeout);

    RBridge.call && RBridge.call(className, methodName, params, (success) => {
      success = parse2json(success);
      // console.log(`RAP_CALLER_SUCCESS:: [${className}.${methodName}], params: ${JSON.stringify(params)}, success: ${success}}`);
      clearTimeout(callbackTimeout);
      resolve(success);
    }, (error) => {
      error = parse2json(error);
      // logger.log('------start---------');
      logger.error(`rap-weex: ${MODULE_NAME}--call::  ${className}.${methodName}, params: ${params} \n \n error: ${error}`);
      // logger.log('------end---------');
      // console.error('RAP_CALLER_FAILED::' + `[${className}.${methodName}]--failure, \n message:: ${error}`);
      clearTimeout(callbackTimeout);
      reject(error);
    }, (notify) => {
      clearTimeout(notifyCallback);
      if (notifyCallbackDone) return;

      notify = parse2json(notify);
      // console.log(`RAP_CALLER_NOTIFY_SUCCESS:: [${className}.${methodName}], params: ${JSON.stringify(params)}, notify: ${JSON.stringify(notify)}}`);
      callback && callback(notify);
    });
  });
};

export default {
  call,
  invoke: call,
  requireModule
};
