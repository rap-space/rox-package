import RapBridge from '../rap';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';

const CLASS_NAME = 'navigator';

function formatURL(url) {
  return url;
};

function formatTitle(options) {
  options = options || '';
  if (isString(options)) {
    options = {
      text: options
    };
  } else if (isObject(options)) {
    let url = formatURL(options.url);
    options = {
      text: options.text,
      url: url,
      textColor: options.textColor || '#333333',
      iconImage: options.iconImage,

      subText: options.subText || '',
      subUrl: url,
      subTextColor: options.subTextColor || '#999999',
      subIconImages: options.subIconImages || []
    };
  } else {
    console.error('parameter format is wrong');
  }
  return options;
}

let Navigator = {
  push(param) {
    // 如果直接传一个String
    if (isString(param)) {
      param = {
        url: param
      };
    }
    param = param || {};
    let url = param.url;
    if (!url) {
      console.error('param.url');
    }

    let title = formatTitle(param.title);
    let backgroundColor = param.backgroundColor;
    let clearTop = param.clearTop || false;
    let animate = param.animate || true;
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'push',
      param: {
        url: formatURL(url),
        backgroundColor: backgroundColor,
        title: title,
        clearTop: clearTop,
        animate: animate
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
        index: index,
        animated: animated
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
    let animated = param && param.animated;
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'popTo',
      param: {
        index: index,
        animated: animated
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
    let param = {};
    // 长度待确认
    if (options.text) {
      param.text = options.text;
    };

    // 尺寸待固定;
    if (options.iconImage) {
      param.iconImage = options.iconImage;
    }

    if (options.onPress) {
      callback = options.onPress;
    };
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'addRightItem',
    }, callback);
  },
  removeRightItem(tagName) {
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'addRightItem',
      param: {
        tagName: tagName
      }
    });
  }
};
export default Navigator;