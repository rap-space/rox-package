import Rap from './rap';

let aop = {
  request(param, successCallback, failureCallback) {
    let options = {};
    options.api = param.api;
    options.v = param.v;
    options.appKey = param.appKey;
    options.type = param.type;
    options.timeout = param.options;

    //
    Rap.invoke({
      className: 'aop',
      methodName: 'request',
      param: options
    }, (e) => {
      // 这里有成功与失败的场景
      // 成功-能够调通服务
      // 成功-服务调用成功
      // 成功-服务调用失败
      // 失败
      // 失败-网络异常
      // 失败-网关服务异常
    }).then(() => {
      // a
    }, () => {

    });
  }
};
export default aop;
