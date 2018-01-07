import RapBridge from './rap';

let User = {
  getInfo(callback) {
    // 这里的用户信息
    return RapBridge.call({
      className: 'user',
      methodName: 'getInfo',
      param: {}
    }, (info) => {
      callback && callback(info);
    });
  }
};
export default User;