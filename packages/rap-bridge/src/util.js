
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import Version from './version';
import log from './log';

function defer() {
  let deferred = {
    always(...args) {
      this.promise.then(...args);
      this.promise.catch(...args);
      return this;
    }
  };
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

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

export default { defer, each, Version, log };