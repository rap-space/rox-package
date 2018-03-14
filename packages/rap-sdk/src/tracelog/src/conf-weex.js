var browserConf = require('./conf-browser');

var isWeb = typeof WXEnvironment === 'object' && WXEnvironment.platform == 'Web';

module.exports = {
  sendRequest: function(url) {
    var wpo = this;

    if (url.indexOf('https:') != 0 && url.indexOf('//') == 0) {
      url = 'https:' + url;
    }

    // weex的浏览器环境
    if (isWeb) { // window 对象和window.navigator对象都有了,但是有WXEnvironment对象
      browserConf.sendRequest(url);
    } else {
      /**
       * 使用weex fetch发起请求
       * 参考: <http://alibaba.github.io/weex/doc/modules/stream.html>
       *
       * @param options {Object}
       * @param callback {Function}
       * @param progressCallback {Function}
       * @description
       *
       *  **注意**: 必须传入3个参数,weex request才会work
       *
       */
      wpo.config.request({
        method: 'GET',
        url: url,
        type: 'json'
      }, function(response) {
        // debug模式下打印成功上报日志
        if (wpo.debug && wpo.config.toast) {
          wpo.config.toast({
            'message': 'log report success, ' + url + ', ' + JSON.stringify(response),
            'duration': 5
          });
        }
      }, function(response) {
      });
    }
  },

  getCookie: function(wpo) {
    return wpo.config.cookie;
  },

  getSpmId: function() {
    return this.spmId;
  }
};