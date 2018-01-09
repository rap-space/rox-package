import RapBridge from './rap';

let Loading = {
  showLoading(param) {
    return RapBridge.call({
      className: 'ui',
      methodName: 'showLoading',
      param: {
        iconImage: param.iconImage,
        text: param.text
      }
    });
  },
  hideLoading() {
    return RapBridge.call({
      className: 'ui',
      methodName: 'hideLoading',
      param: {}
    });
  }
};
export default Loading;