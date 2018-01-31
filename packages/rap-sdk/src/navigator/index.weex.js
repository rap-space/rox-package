import RapBridge from '../rap';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';

const CLASS_NAME = 'navigator';

function formatURL(url) {
  return url;
};

function formatTitle(options) {
  options = options || {};

  if (isString(options)) {
    options = {
      text: options
    };
  } else if (isObject(options)) {
    const url = formatURL(options.url);

    options = {
      text: options.text,
      url,
      textColor: options.textColor || '#333333',
      iconImage: options.iconImage,

      subText: options.subText,
      subUrl: url,
      subTextColor: options.subTextColor || '#999999',
      subIconImages: options.subIconImages || []
    };
  } else {
    console.error('parameter format is wrong');
  }
  return options;
}

const Navigator = {
  push(param) {
    // 如果直接传一个String
    if (isString(param)) {
      param = {
        url: param
      };
    }
    param = param || {};

    const url = param.url;

    if (!url) {
      console.error('param.url');
    }

    const title = formatTitle(param.title);
    const backgroundColor = param.backgroundColor;
    const clearTop = param.clearTop || false;
    const animated = param.animated !== false ? true : false;

    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'push',
      param: {
        url: formatURL(url),
        backgroundColor,
        title,
        clearTop,
        animated
      }
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
      index = index;
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

  clear(param) {
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
