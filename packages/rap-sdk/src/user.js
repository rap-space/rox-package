import { parseJson } from './util';

const USER_MODULE = '@weex-module/user';
const User = window.require(USER_MODULE);
import Mtop from './mtop';

export default {
  getUserInfo(options, callback) {
    if (!callback) {
      callback = options;
    }
    if (User.getUserInfo) {
      let extraInfoPromise;
      if (options && options.extraInfo) {
        // getUserExtraInfo
        extraInfoPromise = new Promise((resolve, reject) => {
          Mtop.request({
            api: '',
            ecode: 1,
            timeout: 2000,
            v: '1.0'
          }, (res) => {
            resolve(res);
          }, function(error) {
            reject(error);
          });
        });
      }

      let userInfoPromise = new Promise((resolve, reject) => {
        User.getUserInfo((info) => {
          info = parseJson(info);
          if (String(info.isLogin) === 'true') {
            info.isLogin = true;
            resolve(info);
          } else {
            info.isLogin = false;
            reject(info);
          }
          // callback && callback(info);
        });
      });
      let promises = [];

      if (userInfoPromise) {
        promises.push(userInfoPromise);
      }
      if (extraInfoPromise) {
        promises.push(extraInfoPromise);
      }

      Promise.all(extraInfoPromise).then((e) => {
        // 成功
        console.log('----- getUserInfo ----- ', e);
        callback(e);
      }, () => {
        // 失败
      }).catch((error) => {
        // error
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
