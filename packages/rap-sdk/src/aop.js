// 需要考虑三种场景
// 1. Weex环境下
// 2. weex 降级的 主客容器下
// 3. H5下 import {report} from '@ali/universal-tracker';
import Mtop from './mtop';
import navi from './navigator';
import { isWeex, isWeb } from './env';
import location from './location';
// import tracelog from './tracelog';
// import logger from './logger';
import { parse2json, each, logger } from './util';
import sso from './biz/sso';

const RAP_SUCCESS = 'RAP_SUCCESS';
const RAP_FAILURE = 'RAP_FAILURE';
const MTOP_RET_BOUND_SYMBOL = '::';
const MTOP_RET_SUCCESS = 'SUCCESS';
const MTOP_MESSAGE_NULL = 'null';
const AOP_TRUE = 'true';
const AOP_FALSE = 'false';
const rCode = /FAIL_BIZ_/;
const DISABLED_REFRESH_TOKEN = 'disabled_refreshToken';
const EXPIRED_REFRESH_TOKEN = 'expired_refreshToken';
const NOT_EXIST_AUTH_RELATION = 'not_exist_auth_relation';
const NO_ORDER = 'no_order';

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
    type: 'POST',
    isOpenApi: true, // 约定参数 再通知Native 透传 appKey与 timestamp
    v: '1.0',
    data
  };

  return params;
}

/**
 * web 端 fetch 模拟
 * @param {Object} options fetch
 * @param {function} successCallback 成功回调
 * @param {function} failureCallback 错误回调
 */
function webFetch(options, successCallback, failureCallback) {
  return new Promise((resolve, reject) => {
    fetch(options.url, options).then(response => {
      const headers = [];

      for (const key of response.headers.keys()) {
        headers.push({
          [key]: response.headers.get(key),
        });
      }

      return new Promise(resolve => {
        response.text().then(d => {
          resolve({
            body: d,
            header: headers,
          });
        });
      });
    }).then(d => {
      successCallback && successCallback(d);
      resolve(d);
    }).catch(e => {
      failureCallback && failureCallback(e);
      reject(e);
    });
  });
}

/**
 *
 * @param {Object} options
 * @param {String} options.url   请求地址
 * @param {String} options.method 请求方式
 * @param {String} options.headers 请求头
 * @param {Object} options.body 请求体
 */
function formatHttpProxyParams(options) {
  const API = 'mtop.1688.wireless.isv.httpproxy';
  const data = {};

  data.targetUrl = options.url;
  data.method = options.method || 'GET';
  data.headers = typeof options.headers === 'object' ? JSON.stringify(options.headers) : options.headers;
  data.body = options.body;
  if (typeof options.timeout === 'number') {
    data.timeout = options.timeout;
  }

  if (typeof options.body === 'object') {
    data.body = JSON.stringify(options.body);
  }

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

    retJson = parse2json(retJson);

    if (RAP_SUCCESS === retJson.code) {
      res = parse2json(retJson.data);

      const ret = res.ret[0].split(MTOP_RET_BOUND_SYMBOL);
      const code = ret[0].toUpperCase();

      if (MTOP_RET_SUCCESS === code) {
        o = res.data;
      } else {
        o.success = AOP_FALSE;
        o.errorCode = code.replace(rCode, '');
        o.errorMessage = ret[1] === MTOP_MESSAGE_NULL ? '' : ret[1];
      }
    } else {
      o.success = AOP_FALSE;
      o.errorCode = RAP_FAILURE;
      o.errorMessage = '接口调用异常';
    }

    return o;
  } catch (e) {
    console.error(`ERROR:: ${e}`);
  }
}

var before = function(action) {
  return function(func) {
    return function() {
      action && action.apply(undefined, arguments);
      func && func.apply(undefined, arguments);
    };
  };
};

const AOP = {
  request(options, successCallback, failureCallback) {
    const bizType = '3';
    let params = {};
    // 获取插件信息; 根据bizType【是否是三方】来决定使用哪个 MTOP，还是只作为MTOP通道
    if (bizType === '3') {
      params = formatOpenApiParams(options);
    } else {
      params = options;
    }
    params.data = params.data || {};

    const namespace = params.data.namespace;
    const apiName = params.data.apiName;
    const apiVersion = params.data.apiVersion;

    const start = Date.now();
    const beforeSuccess = before(() => {
      logger.api(`OK#${namespace}#${apiName}#${apiVersion}`, params.data, Date.now() - start);
      // tracelog.traceAopApi(namespace, apiName, apiVersion, true, Date.now() - start, 'success');
    });
    const beforeFailure = before((data) => {
      logger.api(`ERROR#${namespace}#${apiName}#${apiVersion}`, params.data, Date.now() - start, data);
      // tracelog.traceAopApi(namespace, apiName, apiVersion, false, Date.now() - start, data.errorCode);
    });

    return _promise(params, beforeSuccess(successCallback), beforeFailure(failureCallback));
  },

  proxy(options, successCallback, failureCallback) {
    if (isWeb) {
      return webFetch(options, successCallback, failureCallback);
    }
    const params = formatHttpProxyParams(options);
    const start = Date.now();
    const beforeSuccess = before(() => {
      logger.api('OK#' + params.data.targetUrl, params, Date.now() - start);
      // tracelog.traceProxyApi(params.data.targetUrl, true, Date.now() - start, 'success');
    });
    const beforeFailure = before((data) => {
      logger.api('ERROR#' + params.data.targetUrl, params, Date.now() - start, data);
      // tracelog.traceProxyApi(params.data.targetUrl, false, Date.now() - start, data.errorCode);
    });

    return _promise(params, beforeSuccess(successCallback), beforeFailure(failureCallback));
  },

  proxyV2(options, successCallback, failureCallback) {
    if (isWeb) {
      return webFetch(options, successCallback, failureCallback);
    }
    const params = formatHttpProxyParams(options);
    const start = Date.now();
    const beforeSuccess = before(() => {
      logger.api('OK#' + params.data.targetUrl, params, Date.now() - start);
      // tracelog.traceProxyApi(params.data.targetUrl, true, Date.now() - start, 'success');
    });
    const beforeFailure = before((data) => {
      logger.api('ERROR#' + params.data.targetUrl, params, Date.now() - start, data);
      // tracelog.traceProxyApi(params.data.targetUrl, false, Date.now() - start, data.errorCode);
    });

    return _promiseV2(params, beforeSuccess(successCallback), beforeFailure(failureCallback));
  }
};


function _promise(params, successCallback, failureCallback) {
  return new Promise((resolve, reject) => {
    Mtop.request(params, (retJson) => {
      const data = formatRetJson(retJson);
      if (AOP_TRUE === String(data.success)) {
        successCallback && successCallback(data.result);
        resolve(data.result);
      } else {
        _failureCallback(data, failureCallback, reject);
      }
    }, (retJson) => {
      const data = formatRetJson(retJson);
      _failureCallback(data, failureCallback, reject);
    });
  });
};


function _promiseV2(params, successCallback, failureCallback) {
  return new Promise((resolve, reject) => {
    Mtop.requestV2(params, (retJson) => {
      const data = formatRetJson(retJson);
      if (AOP_TRUE === String(data.success)) {
        successCallback && successCallback(data.result);
        resolve(data.result);
      } else {
        _failureCallback(data, failureCallback, reject);
      }
    }, (retJson) => {
      const data = formatRetJson(retJson);
      _failureCallback(data, failureCallback, reject);
    });
  });
};


function getEmotionPageURL(options) {
  var arr = [];
  each(options, (val, key, obj) => {
    if (val) {
      arr.push(`${key}=${val}`);
    }
  });
  let queryString = arr.join('&');
  return `https://air.1688.com/apps/alim/open/emotion-page.html?wh_weex=true&${queryString}`;
}

function _failureCallback(data, failureCallback, reject) {
  // let errorCode = data.errorCode;
  // if (errorCode === DISABLED_REFRESH_TOKEN) {
  //   let targetURL = getTargetURL('DISABLED_REFRESH_TOKEN');
  //   gotoEmotionPage(targetURL);
  //   // 是否还要reject;
  // } else if (typeof errorCode === 'undefined') {
  //   let targetURL = getTargetURL('DISABLED_TOKEN');
  //   console.error(`[aop response data]:: ${JSON.stringify(data)}, 为你跳转到: ${targetURL}`);
  //   gotoEmotionPage(targetURL);
  // } else {
  //   failureCallback && failureCallback(data);
  //   reject(data);
  // }

  var errorCode = data.errorCode;
  if (errorCode === DISABLED_REFRESH_TOKEN) {
    // token 无效
    var targetURL = getTargetURL('DISABLED_REFRESH_TOKEN');
    gotoEmotionPage(targetURL);
    // 是否还要reject;
  } else if (errorCode === EXPIRED_REFRESH_TOKEN) {
    // token 过期
    var _targetURL = getTargetURL('EXPIRED_REFRESH_TOKEN');
    gotoEmotionPage(_targetURL);
  } else if (errorCode === NOT_EXIST_AUTH_RELATION || errorCode === NO_ORDER) {
    // 用户未授权
    // gotoEmotionPage(getTargetURL('NOT_EXIST_AUTH_RELATION'));
    sso.goAuth();

  // } else if (errorCode) {
  //   // 其它错误
  //   var _targetURL2 = getTargetURL('DISABLED_TOKEN', errorCode);
  //   console.error('[aop response data]:: ' + JSON.stringify(data) + ', \u4E3A\u4F60\u8DF3\u8F6C\u5230: ' + _targetURL2);
  //   gotoEmotionPage(_targetURL2);
  } else {
    failureCallback && failureCallback(data);
    reject(data);
  }
}

function getTargetURL(errorCode) {
  let originalURL = location.href;
  let redirectURL = location.href;

  let targetURL = getEmotionPageURL({
    errorCode: errorCode,
    redirectURL: encodeURIComponent(redirectURL),
    originalURL: encodeURIComponent(originalURL),
  });

  return targetURL;
}

let isInvalidToken = false;
function gotoEmotionPage(targetURL) {
  if (!isInvalidToken) {
    navi.push({
      url: targetURL,
      clearTop: true,
      animated: false
    }).then(() => {
      isInvalidToken = false;
    });
  }
  isInvalidToken = true;
}

export default AOP;
