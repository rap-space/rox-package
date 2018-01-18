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
  }
};
export default AliWangwang;
