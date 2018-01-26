import { parseJson } from './util';

const USER_MODULE = '@weex-module/user';
const User = window.require(USER_MODULE);

export default {
  getUserInfo(callback) {
    if (User.getUserInfo) {
      User.getUserInfo((info) => {
        info = parseJson(info);
        if (String(info.isLogin) === 'true') {
          info.isLogin = true;
        } else {
          info.isLogin = false;
        }

        callback && callback(info);
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
