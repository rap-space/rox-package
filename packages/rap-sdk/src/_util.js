
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import Version from './version';
import logger from './log';

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

function getAppKey() {
  return '';
}
export default { each, Version, logger, parse2json, getAppKey};
