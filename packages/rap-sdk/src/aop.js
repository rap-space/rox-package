// 需要考虑三种场景
// 1. Weex环境下
// 2. weex 降级的 主客容器下
// 3. H5下
// import {report} from '@ali/universal-tracker';
import Rap from './rap';
import { isWeex, isWeb } from './env';
import { defer } from './util';

const RESPONSE_TYPE = {
  /**
   * @description 请求出错
   * @type {Number}
   */
  'ERROR': -1,
  /**
   * @description 请求成功
   * @type {Number}
   */
  'SUCCESS': 0,
  /**
   * @description 请求token过期
   * @type {Number}
   */
  'TOKEN_EXPIRED': 1,
  /**
   * @description 请求session过期
   * @type {Number}
   */
  'SESSION_EXPIRED': 2
};

function report() {};

function reportError(params, retJson) {
  params = params || {};
  if (params.disableTracker) {
    return;
  }

  let errorMsg;

  try {
    errorMsg = JSON.stringify(retJson);
  } catch (e) {
    // Noop
  }

  try {
    report({
      url: location.protocol + '//' + location.host + location.pathname + '/universal_mtop',
      type: 'data',
      sampling: 10,
      message: errorMsg ? errorMsg.substring(0, 500) : params.api + ':response can not be parse'
    });
  } catch (e) {
    // Noop
  }
}

function requestByRap(options, successCallback, failureCallback) {
  Rap.call({
    className: 'mtop',
    methodName: 'request',
    options: options
  }).then(successCallback, failureCallback);
}

// 这里有成功与失败的场景
// 成功-能够调通服务
// 成功-服务调用成功
// 成功-服务调用失败
// 失败
// 失败-网络异常
// 失败-网关服务异常
function formatRetJson(retJson) {
  try {
    return retJson.data;
  } catch (e) {
    console.error(`ERROR:: ${e}`);
  }
}

const AOP = {
  request(options, successCallback, failureCallback) {
    let defered = defer();
    let bizType = '3';
    // 这里有
    let _failureCallback = (retJson) => {
      failureCallback = failureCallback || successCallback;
      failureCallback && failureCallback(formatRetJson(retJson));
      // reportError(params, retJson);
      defered.reject(formatRetJson(retJson));
    };
    let _successCallback = (retJson) => {
      successCallback && successCallback(formatRetJson(retJson));
      defered.resolve(formatRetJson(retJson));
    };

    let params = {};
    // 获取插件信息; 根据bizType【是否是三方】来决定使用哪个 MTOP，还是只作为MTOP通道
    if (bizType === '3') {
      // namespace
      // apiName
      // apiVersion
      // appKey
      // params
      let data = {};
      data.namespace = options.namespace;
      data.apiName = options.api;
      data.apiVersion = options.v || options.version || '1.0';
      if (typeof options.params === 'object') {
        data.params = JSON.stringify(options.params);
      }
      if (isWeex) {
        params = {
          api: 'mtop.1688.wireless.openapi.gateway',
          isOpenApi: true,
          v: '1.0',
          data: data
        };
      }
    } else {
      params = options;
    }

    requestByRap(params, successCallback, failureCallback);

    return defered.promise;
  }
};

export default AOP;
