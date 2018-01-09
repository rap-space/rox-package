import RapBridge from './rap';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

function formatURL(url) {
  return url;
};
function formatTitle(options) {
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
    param = param || {};
    let url = param.url;
    if (!url) {
      console.error('must pass a url');
    }

    let title = formatTitle(param.title);
    let backgroundColor = param.backgroundColor;
    let clearTop = param.clearTop || false;
    let animate = param.animate || true;
    return RapBridge.call({
      className: 'naviagtor',
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

  pop(param) {
    param = param || { index: 1, animate: true};
    return RapBridge.call({
      className: 'naviagtor',
      methodName: 'pop',
      param: {
        index: param.index,
        animate: param.animate
      }
    });
  },

  popTo(param) {
    return RapBridge.call({
      className: 'naviagtor',
      methodName: 'popTo',
      param: {
        index: param.index,
        animate: param.animate
      }
    });
  },

  setTitle(param) {
    return RapBridge.call({
      className: 'naviagtor',
      methodName: 'popTo',
      param: formatTitle(param)
    });
  },

  addRightItem(options) {
    let param = {};
    // 长度待确认
    if (options.text) {
      param.text = options.text;
    };

    // 尺寸待固定;
    if (options.iconImage) {
      param.iconImage = options.iconImage;
    }
    return RapBridge.call({
      className: 'naviagtor',
      methodName: 'popTo',
      param: param
    });
  }
};
export default Navigator;