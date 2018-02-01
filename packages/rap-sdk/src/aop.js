// 需要考虑三种场景
// 1. Weex环境下
// 2. weex 降级的 主客容器下
// 3. H5下 import {report} from '@ali/universal-tracker';
import Mtop from './mtop';
import navi from './navigator';
import { isWeex, isWeb } from './env';
import { defer, parseJson, each } from './util';
import location from './location';

const RAP_SUCCESS = 'RAP_SUCCESS';
const RAP_FAILURE = 'RAP_FAILURE';
const MTOP_RET_BOUND_SYMBOL = '::';
const MTOP_RET_SUCCESS = 'SUCCESS';
const MTOP_MESSAGE_NULL = 'null';
const AOP_TRUE = 'true';
const AOP_FALSE = 'false';
const rCode = /FAIL_BIZ_/;
const DISABLED_REFRESH_TOKEN = 'disabled_refreshToken';

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
 *
 * @param {Object} options
 * @param {String} options.url   请求地址
 * @param {String} options.method 请求方式
 * @param {String} options.headers 请求头
 * @param {String} options.body 请求体
 */
function formatHttpProxyParams(options) {
  const API = 'mtop.1688.wireless.isv.httpproxy';
  const data = {};

  data.targetUrl = options.url;
  data.method = options.method || 'GET';
  data.headers = options.headers;
  data.body = options.body;

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

    retJson = parseJson(retJson);

    if (RAP_SUCCESS === retJson.code) {
      res = parseJson(retJson.data);

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
    return _promise(params, successCallback, failureCallback);
  },

  proxy(options, successCallback, failureCallback) {
    const params = formatHttpProxyParams(options);
    return _promise(params, successCallback, failureCallback);
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

let emotionPageURL = 'https://air.1688.com/apps/alim/open/emotion-page.html?wh_weex=true';

function getEmotionPageURL(options) {
  var arr = [];
  each(options, (val, key, obj) => {
    if (val) {
      arr.push(`${key}=$${val}`);
    }
  });
  let queryString = arr.join('&');
  return `${emotionPageURL}&${queryString}`;
}
function _failureCallback(data, failureCallback, reject) {
  let errorCode = data.errorCode;
  if (data.errorCode === DISABLED_REFRESH_TOKEN) {
    let appKey = '1';
    let categroy = '2';
    let originalURL = location.href;
    let redirectURL = location.href;
    let errorCode = DISABLED_REFRESH_TOKEN.toUpperCase();
    let targetURL = getEmotionPageURL({
      appKey: appKey,
      categroyName: categroy,
      redirectURL: redirectURL,
      originalURL: originalURL,
    });
    // console.log('targetURL--', targetURL);
    navi.push({
      url: targetURL,
      clearTop: true,
      animated: false
    });
    // 是否还要reject;
  } else {
    failureCallback && failureCallback(data);
    reject(data);
  }
}

export default AOP;
