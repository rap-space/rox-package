import Rap from './rap';
const CLASS_NAME = 'ui';
let Loading = {
  showLoading(options) {
    options = options || {};
    let param = {};
    if (options.iconImage) {
      param.iconImage = options.iconImage
    }
    if (options.text) {
      param.text = options.text;
    }
    return Rap.call({
      className: CLASS_NAME,
      methodName: 'showLoading',
      param: param
    });
  },
  hideLoading() {
    return Rap.call({
      className: CLASS_NAME,
      methodName: 'hideLoading',
      param: {}
    });
  }
};
export default Loading;