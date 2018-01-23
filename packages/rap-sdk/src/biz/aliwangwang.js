import Rap from '../rap';

let AliWangwang = {
  openChat(param) {
    if (typeof param === 'string') {
      param = {
        loginId: param
      };
    };

    return Rap.invoke({
      className: 'aliwangwang',
      methodName: 'openChat',
      param
    });
  },
  sendMessage(param) {
    return Rap.invoke({
      className: 'aliwangwang',
      methodName: 'sendMessage',
      param
    });
  },
  isLogin(param) {
    if (typeof param === 'string') {
      param = {
        loginId: param
      };
    };

    return Rap.invoke({
      className: 'aliwangwang',
      methodName: 'isLogin',
      param
    });
  }
};

export default AliWangwang;
