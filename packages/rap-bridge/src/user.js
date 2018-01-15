const USER_MODULE = '@weex-module/user';
const User = window.require(USER_MODULE);

export default {
  getUserInfo(callback) {
    if (User.getUserInfo) {
      User.getUserInfo((info) => {
        info = handleToJSON(info);
        if (String(info.isLogin) === 'true') {
          info.isLogin = true;
        } else {
          info.isLogin = false;
        }
        // if (String(info.isLogin) === 'false') {
        //   info.isLogin = false;
        // }
        callback && callback(info);
      });
    }
  },

  login(callback) {
    if (User.login) {
      User.login((ret) => {
        ret = handleToJSON(ret);
        ret.isLogin = false;

        if (ret && String(ret.status) === 'success') {
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

function handleToJSON(info) {
  if (typeof info === 'string') {
    try {
      info = JSON.parse(info);
    } catch (e) {
      console.error('handleToJSON error:', e);
      info = info || {};
    }
  }
  return info;
}
