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
    // options = {
    //   text: options.text,
    //   textColor: options.textColor || '#333333',
    //   iconImage: options.iconImage,
    //   subText: options.subText,
    //   subUrl: url,
    //   subLeftIconImage: options.subLeftIconImage,
    //   subRightIconImage: options.subRightIconImage,
    //   subTextColor: options.subTextColor || '#999999',
    // };
    if (url) {
      options.url = url;
    }
  } else {
    console.error('parameter format is wrong');
  }
  return options;
}

const Navigator = {
  push(options) {
    // 如果直接传一个String
    if (isString(options)) {
      options = {
        url: options
      };
    }
    options = options || {};
    const url = options.url;
    const title = formatTitle(options.title);
    const backgroundColor = options.backgroundColor;
    const clearTop = options.clearTop || false;
    const animated = options.animated !== false ? true : false;
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
      param: param
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
