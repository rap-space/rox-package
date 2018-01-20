
const isWeex = typeof callNative === 'function';
const isWindVane = typeof WindVane !== 'undefined';
let WV = {};

function defer() {
  let deferred = {
    always(...args) {
      this.promise.then(...args);
      this.promise.catch(...args);
      return this;
    }
  };
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

WV.call = function(className, method, data) {
  let deferred = defer();
  if (isWeex) {
    let Windvane = require('@weex-module/windvane');

    const options = {
      class: className,
      method,
      data
    };

    if (Windvane.call2) {
      Windvane.call2(options, (result) => {
        deferred.resolve(result);
      }, (error) => {
        deferred.reject(error);
      });
    } else if (Windvane.call) {
      Windvane.call(options, (result) => {
        deferred.resolve(result);
      });
    }
    // eslint-disable-next-line
  } else if (isWindVane && WindVane.isAvailable) {
    // eslint-disable-next-line
    WV.isAvailable = WindVane.isAvailable;
    // eslint-disable-next-line
    WindVane.call(className, method, data, (result) => {
      deferred.resolve(result);
    }, (error) => {
      deferred.reject(error);
    });
  } else {
    // 失败
    deferred.reject({
      msg: '浏览器不支持 windvane',
      ret: ['HY_NOT_SUPPORT_DEVICE']
    });
  }
};

export default WV;
