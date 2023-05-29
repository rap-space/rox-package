import { parse2json } from './util';
import AOP from './aop';
import localStorage from './localstorage';

const USER_MODULE = '@weex-module/user';
const User = window.require(USER_MODULE);

let extraInfo = false;
let LOCAL_USER_EXTRA_INFO = '__userExtraInfo__';

function setDataToLocal(res, options) {
  let data = {};
  let localKey = LOCAL_USER_EXTRA_INFO + options.nick;
  data[localKey] = JSON.stringify({
    timestramp: Date.now(),
    res: res
  });
  localStorage.setItem(data);
}

function getDataFromLocal(callback, options) {
  // 默认 30 秒
  let expiresTime = options.expiresTime || 30;
  let localKey = LOCAL_USER_EXTRA_INFO + options.nick;
  localStorage.getItem([localKey]).then((res) => {
    let result = res.data[localKey];
    let data = { timestramp: 0 };
    if (result && typeof result === 'string') {
      try {
        data = JSON.parse(result);
      } catch (error) {
        console.error('json parse error', error);
      }
    }

    let nowTimestamp = Date.now();
    let oldTimestamp = data.timestramp;
    let disTimestamp = nowTimestamp - oldTimestamp;

    if (disTimestamp <= 1000 * expiresTime && data.res) {
      console.log('取到 localstorage 缓存数据');
      callback(data.res);
    } else {
      // 未取到本地缓存数据
      console.log('未取到 localstorage 缓存数据');
      callback(false);
    }
  }).catch((e) => {
    console.log('e', e);
  });
}

function getUserExtraInfo(options) {
  // getUserExtraInfo
  // https://ocn.alibaba-inc.com/isp/apifactory/api/input.htm?name=alibaba.account.basic&namespace=com.alibaba.account&version=1
  return new Promise((resolve, reject) => {
    if (extraInfo) {
      console.log('复用本地数据');
      return resolve(extraInfo);
    }
    // 先取一下本地的，再去请求线上的
    getDataFromLocal((data) => {
      if (data) {
        resolve(data);
      } else {
        AOP.request({
          api: 'alibaba.account.basic',
          namespace: 'com.alibaba.account',
          v: '1'
        })
          .then((res) => {
            extraInfo = res;
            // 存一下到本地 为了下次请求做缓存
            // __userExtraInfo__: res
            setDataToLocal(res, options);
            resolve(res);
          }, (error) => {
            reject(error);
          });
      }
    }, options);
  });
}
export default {

  getUserInfo(options = { extraInfo: false }) {
    return new Promise((resolve, reject) => {
      if (User.getUserInfo) {
        const getUserInfo = () => {
          User.getUserInfo((info) => {
            info = parse2json(info);
            if (String(info.isLogin) === 'true') {
              info.isLogin = true;
            } else {
              info.isLogin = false;
            }
            if (options.extraInfo) {
              getUserExtraInfo({
                expiresTime: options.expiresTime,
                nick: info.nick
              }).then((res) => {
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
        };

        getUserInfo();
      } else {
        console.warn('请使用阿里巴巴-客户端打开');
        reject(new Error('Please use Alibaba Client'));
      }
    });
  },

  login() {
    return new Promise((resolve, reject) => {
      if (User.login) {
        User.login((ret) => {
          ret = parse2json(ret);
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
