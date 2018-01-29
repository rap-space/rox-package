// 需要考虑三种场景
// 1. Weex环境下
// 2. weex 降级的 主客容器下
// 3. H5下 import {report} from '@ali/universal-tracker';
import Rap from './rap';
import { isWeex, isWeb } from './env';
import { defer, parseJson } from './util';

const RAP_SUCCESS = 'RAP_SUCCESS';
const RAP_FAILURE = 'RAP_FAILURE';
const RET_BOUND_SYMBOL = '::';
const RET_CODE_SUCCESS = 'SUCCESS';
const RET_TRUE = 'true';
const RET_FALSE = 'false';
const RET_MESSAGE_NULL = 'null';
const rCode = /FAIL_BIZ_/;

function report() {};

function reportError(params = {}, retJson) {
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
      message: errorMsg
        ? errorMsg.substring(0, 500)
        : params.api + ':response can not be parse'
    });
  } catch (e) {
    // Noop
  }
}

function requestByRap(options, successCallback, failureCallback) {
  return Rap.call({
    className: 'mtop',
    methodName: 'request',
    options}).then(successCallback, failureCallback);
}

/**
 *
 * @param {Object} options
 * @param {String} options.api  开放平台API Name
 * @param {String} options.version  开放平台 API Version
 * @param {Obejct} options.params   开放平台 业务参数
 * @param {String} options.namespace  开放平台 命名空间
 */
function formatOpenApiParams(options) {
  const API = 'mtop.1688.wireless.openapi.gateway';
  const data = {};

  data.namespace = options.namespace;
  data.apiName = options.api;
  data.apiVersion = `${parseInt(options.v || options.version || '1')}`;
  data.params = options.params;

  if (typeof options.params === 'object') {// fix: android bug
    data.params = JSON.stringify(options.params);
  }

  const params = {
    api: API,
    isOpenApi: true, // 约定参数 再通知Native 透传 appKey与 timestamp
    v: '1.0',
    data
  };

  return params;
}

/**
 *
 * @param {Object} options
 * @param {String} options.targetUrl  代理 url 地址
 */
function formatHttpProxyParams(options) {
  const API = 'mtop.1688.wireless.isv.httpproxy';
  const data = {};

  data.targetUrl = options.targetUrl;
  data.ecode = '1';
  data.method = options.method || 'GET';
  data.headers = options.headers;
  data.body = options.body;

  if (typeof options.body === 'object') {
    data.body = JSON.stringify(options.body);
  }

  data.body = options.body;

  const params = {
    api: API,
    v: '1.0',
    ecode: '1',
    data
  };

  return params;
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
    let res = {};
    let o = {};

    retJson = parseJson(retJson);

    if (RAP_SUCCESS === retJson.code) {
      res = parseJson(retJson.data);

      const ret = res.ret[0].split(RET_BOUND_SYMBOL);
      const code = ret[0].toUpperCase();

      if (RET_CODE_SUCCESS === code) {
        o = res.data;
      } else {
        o.success = RET_FALSE;
        o.errorCode = code.replace(rCode, '');
        o.errorMessage = ret[1] === RET_MESSAGE_NULL ? '' : ret[1];
      }
    } else {
      o.success = RET_FALSE;
      o.errorCode = RAP_FAILURE;
      o.errorMessage = '接口调用异常';
    }
    return o;
  } catch (e) {
    console.error(`ERROR:: ${e}`);
  }
}

const AOP = {
  request(options, successCallback, failureCallback) {
    const defered = defer();
    const bizType = '3';

    const _failureCallback = (retJson) => {
      failureCallback = failureCallback || successCallback;
      failureCallback && failureCallback(formatRetJson(retJson));
      defered.reject(formatRetJson(retJson));
    };
    const _successCallback = (retJson) => {
      let data = formatRetJson(retJson);
      successCallback && successCallback(data);
      defered.resolve(data);
    };

    let params = {};
    // 获取插件信息; 根据bizType【是否是三方】来决定使用哪个 MTOP，还是只作为MTOP通道
    if (bizType === '3') {
      params = formatOpenApiParams(options);
    } else {
      params = options;
    }

    requestByRap(params, _successCallback, _failureCallback);

    return defered.promise;
  },
  httpRequest(options, successCallback, failureCallback) {
    const defered = defer();

    const _failureCallback = (retJson) => {
      failureCallback = failureCallback || successCallback;
      let data = formatRetJson(retJson);
      failureCallback && failureCallback(data);
      defered.reject(data);
    };

    const _successCallback = (retJson) => {
      let data = formatRetJson(retJson);
      successCallback && successCallback(data);
      defered.resolve(data);
    };

    const params = formatHttpProxyParams(options);

    requestByRap(params, _successCallback, _failureCallback);

    return defered.promise;
  }
};

export default AOP;
