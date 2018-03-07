import { parse2json } from './_util';
import AOP from './aop';
import localStorage from './localstorage';

const USER_MODULE = '@weex-module/user';
const User = window.require(USER_MODULE);

let extraInfo = false;
let LOCAL_USER_EXTRA_INFO = '__userExtraInfo__';

function setDataToLocal(res) {
  let data = {};
  data[LOCAL_USER_EXTRA_INFO] = JSON.stringify({
    timestramp: Date.now(),
    res: res
  });
  localStorage.setItem(data);
}

function getDataFromLocal(callback) {
  localStorage.getItem([LOCAL_USER_EXTRA_INFO]).then((res) => {
    let result = res[LOCAL_USER_EXTRA_INFO];
    let data;
    if (result && typeof result === 'string') {
      try {
        data = JSON.parse(result);
      } catch (error) {
        data = { timestramp: 0 };
      }
    }
    let nowTimestamp = Date.now();
    let oldTimestamp = data.timestramp;
    let disTimestamp = nowTimestamp - oldTimestamp;
    // 1 分钟后失效
    if (disTimestamp <= 1000 * 60 && data.res) {
      console.log('取到 localstorage缓存数据');
      callback(data.res);
    } else {
      // 未取到本地缓存数据
      console.log('未取到 localstorage缓存数据');
      callback(false);
    }
  });
}

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
              console.log('复用本地数据', extraInfo);
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
                    setDataToLocal(res);
                    resolve(res);
                  }, (error) => {
                    reject(error);
                  });
              }
            });
          });
        }

        const getUserInfo = () => {
          User.getUserInfo((info) => {
            info = parse2json(info);
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
        };

        getUserInfo();
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
