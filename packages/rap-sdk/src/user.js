import { parseJson } from './util';
import AOP from './aop';

const USER_MODULE = '@weex-module/user';
const User = window.require(USER_MODULE);

let extraInfo = false;

export default {

  getUserInfo(options) {
    return new Promise((resolve, reject) => {
      if (User.getUserInfo) {
        let extraInfoPromise;
        if (options && options.extraInfo) {
          // getUserExtraInfo
          // http://ocn.alibaba-inc.com/isp/apifactory/api/input.htm?name=alibaba.account.basic&namespace=com.alibaba.account&version=1
          extraInfoPromise = new Promise((resolve, reject) => {
            if (extraInfo) {
              resolve(extraInfo);
              return;
            }
            AOP.request({
              api: 'alibaba.account.basic',
              namespace: 'com.alibaba.account',
              v: '1'
            }, (res) => {
              extraInfo = res;
              resolve(res);
            }, function(error) {
              reject(error);
            });
          });
        }

        User.getUserInfo((info) => {
          info = parseJson(info);
          if (String(info.isLogin) === 'true') {
            info.isLogin = true;
          } else {
            info.isLogin = false;
          }
          if (extraInfoPromise) {
            extraInfoPromise.then((res) => {
              resolve({
                ...info,
                extraInfo: res
              });
            }).catch((e) => {
              resolve({
                ...info,
                extraInfo: false
              });
            });
          } else {
            resolve({
              ...info,
              extraInfo: false
            });
          }
        });
      }
    });
  },

  login() {
    return new Promise((resolve, reject) => {
      if (User.login) {
        User.login((ret) => {
          ret = parseJson(ret);
          ret.isLogin = false;

          const status = ret && String(ret.status);

          if (status === 'true' || status === 'success') {
            ret.isLogin = true;
          }

          resolve(ret);
        });
      }
    });
  },

  logout() {
    return new Promise((resolve, reject) => {
      if (User.logout) {
        extraInfo = false;
        User.logout((result) => {
          resolve(result);
        });
      }
    });
  }
};
