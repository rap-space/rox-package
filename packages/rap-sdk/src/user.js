import { parseJson } from './util';

const USER_MODULE = '@weex-module/user';
const User = window.require(USER_MODULE);
import AOP from './aop';

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
          AOP.request({
            api: 'alibaba.account.basic',
            namespace: 'com.alibaba.account',
            v: '1'
          }, (res) => {
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
          extraInfoPromise.then((e) => {
            callback && callback({
              ...info,
              extraInfo: e
            });
          }).catch((e) => {
            // false;
          });
        } else {
          callback && callback(info);
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
      User.logout(callback);
    }
  }
};
