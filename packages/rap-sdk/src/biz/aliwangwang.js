import Rap from '../rap';

let AliWangwang = {
  openChat(loginId) {
    return Rap.invoke({
      className: 'aliwangwang',
      methodName: 'openChat',
      param: {
        loginId
      }
    });
  },
  sendMessage(param) {
    return Rap.invoke({
      className: 'aliwangwang',
      methodName: 'sendMessage',
      param
    }); 
  },
  isLogin(parma) {
    return Rap.invoke({
      className: 'aliwangwang',
      methodName: 'isLogin',
      param
    }); 
  }
};
export default AliWangwang;
