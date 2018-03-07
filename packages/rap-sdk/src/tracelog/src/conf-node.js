module.exports = {
  sendRequest: function (url) {
    // hack: 因为nodejs和browser共用npm包,避免browser端打包的时候引入http模块
    eval('var http = require("http")');

    if (url.indexOf('//') == 0) {
      url = 'http:' + url;
    }

    var sendRequest = http.request(url, function (res) {
      if (res && res.statusCode === 200 && process.env.NODE_ENV === 'local') {
        console.log('retcode log report success', url);
      }
    });

    // 加异常捕获避免影响业务
    sendRequest.on('error', function (err) {
      console.error('retcode log report error', err);
    });

    sendRequest.end();
  },

  getCookie: function (wpo) {
    return wpo.config.cookie;
  },

  getSpmId: function () {
    return this.spmId;
  }
};