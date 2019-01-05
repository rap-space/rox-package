import { requireModule } from './weex-module';
import { parse2json } from '../util';

const MODULE_NAME = '@weex-module/rapcaller';

let RBridge = window.RBridge;

/**
 * 调用 native 接口
 * @param {*} options 参数
 * @param {*} callback notify 回调
 */
function call(options, callback) {
  const { className, methodName } = options;

  // 支持两种， 这里暂时写param
  const params = options.options || options.param || options.params;

  // 设置默认 timeout
  const timeout = params && params.timeout === undefined ? 10000 : params.timeout;
  const notifyTimeout = params.notifyTimeout || timeout;

  if (!RBridge) {
    RBridge = requireModule('rapcaller');
  }

  return new Promise((resolve, reject) => {
    // 在有设置超时时间的情况下，设置超时回调
    let callbackTimeoutDone = false;
    const callbackTimeout = timeout && setTimeout(() => {
      // 标记超时回调已执行
      callbackTimeoutDone = true;
      reject(`ERROR. RAP.call timeout. Current timeout is ${timeout}.`);
    }, timeout);


    // 如果有 notify 回调，这里设置 notify 超时回调
    let notifyCallbackDone = false;
    const notifyCallback = notifyTimeout && setTimeout(() => {
      // 标记超时回调已执行
      notifyCallbackDone = true;
      callback && callback(new Error(`RAP.call Notify TIMEOUT ERROR: ${timeout}.`));
    }, notifyTimeout);


    RBridge.call && RBridge.call(className, methodName, params, (success) => {
      // 清除正常超时回调
      clearTimeout(callbackTimeout);

      // 如果已经超时，不再进行后续调用
      if (callbackTimeoutDone) return;

      // 成功回调
      resolve(parse2json(success));
    }, (error) => {
      // 清除正常超时回调
      clearTimeout(callbackTimeout);

      if (callbackTimeoutDone) return;

      // 错误回调
      reject(parse2json(error));
    }, (notify) => {
      // 正常回调后，清除notify 超时回调
      clearTimeout(notifyCallback);

      // 如果已经超时，不再进行后续调用
      if (notifyCallbackDone) return;

      // 正常 notify 回调
      callback && callback(parse2json(notify));
    });
  });
};

export default {
  call,
  invoke: call,
  requireModule
};
