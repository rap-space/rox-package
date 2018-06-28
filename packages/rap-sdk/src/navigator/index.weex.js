import RapBridge from '../rap';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';

const CLASS_NAME = 'navigator';

function formatURL(url) {
  return url;
};

function formatTitle(options) {
  if (isString(options)) {
    options = {
      text: options
    };
  } else if (isObject(options)) {
    const url = formatURL(options.url);

    if (url) {
      options.url = url;
    }
  } else {
    options = {
      text: ''
    };
  }

  return options;
}

const doOnceInXs = (x) => {
  let flag = true;

  return () => {
    if (flag) {
      flag = false;
      setTimeout(() => flag = true, x);
      return true;
    }
    return false;
  };
};

var hasNotPush = doOnceInXs(3);

const Navigator = {
  push(options, force = false) {
    if (!force && !hasNotPush()) {
      return new Promise(resolve => {
        resolve({
          msg: 'Do push only in 3 seconds',
        });
      });
    }

    // 如果直接传一个String
    if (isString(options)) {
      options = {
        url: options
      };
    }

    let { url, title, backgroundColor, clearTop = false, animated = true } = options || {};

    title = formatTitle(title);

    let param = {
      backgroundColor,
      title,
      clearTop,
      animated
    };

    let resUrl = formatURL(url);

    if (resUrl) {
      param.url = resUrl;
    }

    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'push',
      param
    });
  },

  pop(num) {
    let index = 1;
    let animated = true;

    if (isNumber(+num)) {
      index = num;
    }

    if (isObject(num)) {
      index = num.index;
      animated = num.animated;
    }

    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'pop',
      param: {
        index,
        animated
      }
    });
  },

  popTo(param) {
    let index;

    if (param && param.index) {
      index = param.index;
    } else {
      index = param;
    }

    if (!index) {
      index = 1;
      console.log('index, 为必转参数');
    }

    const animated = param && param.animated;

    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'popTo',
      param: {
        index,
        animated
      }
    });
  },

  setTitle(param) {
    if (!param) {
      param = {
        text: ''
      };
    }
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'setTitle',
      param: formatTitle(param)
    });
  },

  close(param) {
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'close',
      param: {}
    });
  },

  addRightItem(options, callback) {
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'addRightItem',
      param: options
    }, callback);
  },

  removeRightItem(tagName) {
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'removeRightItem',
      param: {
        tag: tagName
      }
    });
  }
};

export default Navigator;
