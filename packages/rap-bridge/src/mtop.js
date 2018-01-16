// 需要考虑三种场景
// 1. Weex环境下
// 2. weex 降级的 主客容器下
// 3. H5下
// import {report} from '@ali/universal-tracker';
import Rap from './rap';
import { isWeex, isWeb } from './env';
import { defer } from './util';


function report() {};
let mtop;
let Windvane;
let Mtop;

try {
  Windvane = Rap.requireModule('windvane');
} catch (e) {
  console.warn('Windvane require error');
}

try {
  Mtop = Rap.requireModule('mtop');
} catch (e) {
  console.warn('Mtop require error');
}

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
function requestByWindvane(options, successCallback, failureCallback) {
  if (Windvane && Windvane.call) {
    if (options.param) {
      console.error('please use options.data');
    }
    options.param = options.data || options.param;
    if (options.type === 'POST') {
      options.post = '1';
    }
    Windvane.call({
      class: 'MtopWVPlugin',
      method: 'send',
      data: options
    }, function(retJson) {
      if (typeof retJson === 'string') {
        retJson = JSON.parse(retJson);
      }
      let isRetTypeSuccess = retJson.retType === RESPONSE_TYPE.SUCCESS;
      let isRetSuccess = retJson.ret && retJson.ret[0].indexOf('SUCCESS') > -1;
      if (isRetTypeSuccess || isRetSuccess) {
        successCallback && successCallback(retJson);
      } else {
        failureCallback && failureCallback(retJson);
      }
    });
  }
}

function requestByMtop(params, successCallback, failureCallback) {
  if (Mtop.request) {
    Mtop.request(params, successCallback, failureCallback);
  }
}

// 这里有成功与失败的场景
// 成功-能够调通服务
// 成功-服务调用成功
// 成功-服务调用失败
// 失败
// 失败-网络异常
// 失败-网关服务异常
mtop = {
  request(options, successCallback, failureCallback) {
    let defered = defer();
    let bizType = '3';
    // 这里有
    let _failureCallback = (retJson) => {
      failureCallback = failureCallback || successCallback;
      failureCallback && failureCallback(retJson);
      // reportError(params, retJson);
      defered.reject(retJson);
    };
    let _successCallback = (retJson) => {
      successCallback && successCallback(retJson);
      defered.resolve(retJson);
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
      data.apiName = options.apiName;
      data.apiVersion = options.apiVersion;
      // 这里最好可以获取到, 一般从 URL上获取;
      // data.appKey = options.appKey;
      data.params = options.params;
      if (isWeex) {
        params = {
          api: 'mtop.1688.wireless.openapi.gateway',
          v: '1.0',
          data: options
        };
      }
    } else {
      params = options;
    }
    if (Windvane) {
      // 这里服务固定
      requestByWindvane(params, _successCallback, _failureCallback);
    } else if (Mtop) {
      requestByMtop(params, _successCallback, _failureCallback);
    }

    return defered;
  }
};
export default mtop;
