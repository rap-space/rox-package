module.exports = function(wpo, win, browserConf) {
  // performance初始数据
  var performanceData = {
    spm: wpo.getSpmId() // 首次尝试获取spm值
  };
  // 页面已绑定的onerror事件
  var onErrorHandler = win.onerror;

  var browser = {
    /**
     * 初始化浏览器端调用
     *
     * @return {void}
     */
    init: function() {
      this.lockPerformanceSpm();
      this.sendPerformance();
      this.bind();

      // debug模式
      if (/wpodebug\=1/.test(location.search)) {
        wpo.config.sample = 1;
        wpo.config.modVal = 1;
        wpo.debug = true;
      }
    },

    /**
     * 事件绑定
     *
     * @return {void}
     */
    bind: function() {
      // unload
      wpo.on(win, 'beforeunload', function() {
        wpo.clear();
        if (wpo.speed.points) {
          wpo.speed(null, null, true);
        }
      }, true);

      // error处理
      win.onerror = function(msg, file, line, col, error) {
        if (onErrorHandler) {
          onErrorHandler(msg, file, line, col, error);
        }

        var stack = error && error.stack;

        if (file) {
          wpo.error('sys', msg, file, line, col, stack);
        }
        else {
          wpo.error(msg);
        }
      };
    },

    /**
     * 获取performance性能数据
     *
     * @returns {{}}
     */
    analyzeTiming: function() {
      var datas = {
        "rrt": ["responseStart", "requestStart"], // 整个网络请求时间（不包括unload）
        "dns": ["domainLookupEnd", "domainLookupStart"], // dns lookup
        "cnt": ["connectEnd", "connectStart"], // 建立 tcp 时间
        "ntw": ["responseStart", "fetchStart"], // network time
        "dct": ["domContentLoadedEventStart", "responseStart"], // dom content loaded time
        "flt": ["loadEventStart", "responseStart"] // full load time 页面完全加载时间
        // "flv": this._getFlashVersion(),
      };

      try {
        var timing = performance.timing;

        for (var name in datas) {
          var start = timing[datas[name][1]];
          var end = timing[datas[name][0]];

          // 脏数据过滤: 部分浏览器,特别是移动端(如UC,windvane容器)某些时间点可能返回0或者null,排除掉此部分
          if (start && end) {
            var cost = end - start;

            // 脏数据过滤: 耗时大于0并且小于1天(1e3 * 3600 * 24)
            if (cost >= 0 && cost < 86400000) {
              performanceData[name] = cost;
            }
          }
        }
      }
      catch (e) {
        // console.log('error');
      }

      return performanceData;
    },

    /**
     * 在body标签完成渲染后,提前锁定测速上报的spm值
     *
     * @returns {void}
     */
    lockPerformanceSpm: function() {
      // 如果首次没有成功锁定spm,则在domReady后,再尝试在meta和body上取一次
      if (!performanceData.spm) {
        var lockSpm = function() {
          var spm = browserConf && browserConf.getSpmId && browserConf.getSpmId();

          if (spm) {
            performanceData.spm = spm;
          }
        };

        var ready = function() {
          if (document.readyState === 'complete') {
            lockSpm();
          }
          else if (document.addEventListener) {
            document.removeEventListener('DOMContentLoaded', ready, false);
            lockSpm();
          } else if (document.readyState === 'complete') {
            document.detachEvent('onreadystatechange', ready);
            lockSpm();
          }
        };

        if (document.addEventListener) {
          document.addEventListener('DOMContentLoaded', ready, false);
        }
        else if (document.attachEvent) {
          document.attachEvent('onreadystatechange', ready);
        }
      }
    },

    /**
     * 上报performance性能数据
     */
    sendPerformance: function() {
      var me = this;

      // support log.js async loaded
      if (document.readyState === 'complete') {
        wpo.performance(me.analyzeTiming());
      } else {
        wpo.on(win, 'load', function() {
          wpo.performance(me.analyzeTiming());
        }, true);
      }
    }
  };

  browser.init();
};