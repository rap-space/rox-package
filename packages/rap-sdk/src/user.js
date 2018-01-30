import { parseJson } from './util';

const USER_MODULE = '@weex-module/user';
const User = window.require(USER_MODULE);
import AOP from './aop';

let extraInfo = false;
export default {
  getUserInfo(options, callback) {
    if (!callback) {
      callback = options;
    }
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
            callback && callback({
              ...info,
              extraInfo: res
            });
          }).catch((e) => {
            // false;
            callback({
              ...info,
              extraInfo: false
            });
          });
        } else {
          callback && callback({
            ...info,
            extraInfo: false
          });
        }
      });
    }
  },
  login(callback) {
    if (User.login) {
      User.login((ret) => {
        ret = parseJson(ret);
        ret.isLogin = false;
        let status = ret && String(ret.status);
        if (status === 'true' || status === 'success') {
          ret.isLogin = true;
        }
        callback && callback(ret);
      });
    }
  },

  logout(callback) {
    if (User.logout) {
      extraInfo = false;
      User.logout(callback);
    }
  }
};
