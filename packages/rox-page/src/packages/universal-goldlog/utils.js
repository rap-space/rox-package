import { isNode } from 'universal-env';

if (isNode) {
  global.window = {}; // eslint-disable-line
}

export function paramsToObj(str) {
  str = typeof str === 'string' ? str : '';

  let result = {};
  let splitStr = str.split('&');

  for (let i = 0; i < splitStr.length; i++) {
    let s = splitStr[i];
    let splitKV = s.split('=');
    let key = splitKV[0];
    let val = splitKV[1];
    if (key) {
      result[key] = val;
    }
  }

  return result;
}

export function objToParams(obj) {
  let result = [];
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      let key = i;
      let val = obj[i];
      result.push(key + '=' + val);
    }
  }
  return result.join('&');
}

export function getParamFromURL(url, param = 'spm') {
  let search = url.split('?')[1] || '';
  let paramValue = '';

  search.split('&').forEach(function(o) {
    if (o.indexOf(`${param}=`) === 0) {
      paramValue = o.substr(param.length + 1);
    }
  });

  return paramValue;
}

export function makeChkSum(s) {
  s = (s || '').split('#')[0].split('?')[0];

  const len = s.length;
  const hash = function(s) {
    const l = s.length;
    let key = 0;
    for (let i = 0; i < l; i++) {
      key = key * 31 + s.charCodeAt(i);
    }
    return key;
  };
  return len ? hash(len + '#' + s.charCodeAt(len - 1)) : -1;
}

export function getMetaContentByName(metaName) {
  const meta = window && window.document && window.document.getElementsByTagName('meta')[metaName];
  return meta ? meta.getAttribute('content') : '';
}

export function simplifyURL(url = '') {
  const WEEX_PREFIX = '_wx_tpl=';
  const WEEX_SUFFIX = '.js';

  // http://wapp.wapa.taobao.com/crowd/index-wx/index.html?groupId=57&_wx_tpl=http://g-assets.daily.taobao.net/tb/m-crowd/0.1.1/p/index-wx/index.js
  // 截取 js 部分 http://g-assets.daily.taobao.net/tb/m-crowd/0.1.1/p/index-wx/index.js
  if (url.indexOf(WEEX_PREFIX) > -1) {
    url = url.substring(url.indexOf(WEEX_PREFIX) + WEEX_PREFIX.length, url.indexOf(WEEX_SUFFIX) + WEEX_SUFFIX.length);
  }

  return url.split('?')[0];
}
