
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import Version from './version';
import logger from './logger';
import Localtion from '../location';

function each(obj, iterator, context = null) {
  if (isObject(obj) && !isArray(obj)) {
    for (var key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      if (iterator.call(context, obj[key], key, obj) === false) break;
    }
  } else if (isNumber(obj.length)) {
    for (var i = 0; i < obj.length; i++) {
      if (iterator.call(context, obj[i], i, obj) === false) break;
    }
  } else {
    console.warn('must pass [object | array | number]');
  }
}

function parse2json(jsonStr) {
  if (typeof jsonStr === 'string') {
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      return {
        parseError: jsonStr
      };
    }
  }

  return jsonStr;
}

function getAppKeyByRapURL(url) {
  let regAppKey = /rap:\/\/openplugin\/(\d+)\//g;
  let regAppKeyNew = /rap:\/\/openplugin\/(\d+)/g;
  let regAirAppKey = /1688\.com\/rap\/(\d+)\//g;
  let regCdnAppKey = /g\.alicdn\.com\/rap\/(\d+)/g
  
  let res;
  if (url.indexOf('rap://openplugin') >= 0) {
    res = regAppKey.exec(url) ||regAppKeyNew.exec(url);
  } else if (url.indexOf('1688.com/rap/') >= 0) {
    // http://air.1688.com/rap/123456/
    res = regAirAppKey.exec(url);
  } else if (url.indexOf('g.alicdn.com/rap/')>=0) {
    res = regCdnAppKey.exec(url);
  }
  let appKey;
  if (res && res[1]) {
    appKey = res[1];
  }
  if (!appKey) {
    console.log('appKey is undefined');
  };
  return appKey;
}

function getAppKey() {
  return getAppKeyByRapURL(Localtion.href);
}

export default { each, Version, logger, parse2json, getAppKey};
