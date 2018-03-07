(function(win) {
  var browserConf = require('./conf-browser');

  var wpo = win.__WPO || {},
    status = 2;

  /**
   * browser环境下，如果已经初始化就不再重复初始化
   * 修改设置需要通过__WPO.setConfig改变
   */
  if(wpo.__hasInitBlSdk) {
    return;
  }
  // env设置
  wpo.env = 'browser';

  require('./core')(wpo, win, browserConf);

  var exec = function() {
    require('./sampling')(wpo);
    require('./apis')(wpo);
    require('./browser-performance')(wpo, win, browserConf);
    wpo.__hasInitBlSdk = true;
  };

  if (wpo.config.dynamic) {
    //
    // 自更新log.js
    //
    if (!(status = require('./server-config')(wpo))) {
      require('./api-await')(wpo, function() {
        exec();
        if (wpo.reloaded) {
          wpo.reloaded();
        }
      });
      return;
    }
  }

  if (status == 2) {
    // support log.js async loaded
    if (document.readyState === 'complete') {
      wpo.ready();
    } else {
      wpo.on(win, 'load', function() {
        wpo.ready();
      }, true);
    }
  }

  exec();
})(window);

module.exports = window.__WPO;