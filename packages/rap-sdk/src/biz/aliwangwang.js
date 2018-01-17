import Rap from '../rap';

let AliWangwang = {
  openChart(loginId) {
    return Rap.invoke({
      className: 'aliwangwang',
      methodName: 'openChart',
      param: {
        loginId
      }
    });
  }
};
export default AliWangwang;
