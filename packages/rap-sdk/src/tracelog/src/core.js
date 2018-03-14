module.exports = function (wpo, root, conf) {
  var cookies = {};
  var count   = 0;
  var uid, timer;

  var config = {
    // 默认上报上报
    imgUrl : '//retcode.taobao.com/r.png?',
    // 默认抽样率
    sample : 10,
    modVal : 1,
    // 是否开启动态配置功能
    dynamic: false,
    // API抽样率
    retCode: {},
    delayOfReady: null
  };

  /**
   * safety function caller
   * @param  {Function} fn
   * @param  {Array}   args
   * @param  {*}   defaultValue
   * @return {*}
   */
  var safetyCall = function (fn, args, defaultValue) {
    if (typeof fn !== 'function') return defaultValue;
    try {
      return fn.apply(this, args);
    } catch (ex) {
      return defaultValue;
    }
  }


  var sendRequest = conf.sendRequest;

  var _send = function () {
    var params, obj;

    // 发送log.js异步加载前的数据队列
    if (wpo.asyncQueue && wpo.asyncQueue.length > 0) {
      var asyncQueue = wpo.asyncQueue;
      var item;

      while (item = asyncQueue.shift()) {
        var method = item.method;

        if (typeof wpo[method] === 'function') {
          wpo[method].apply(wpo, item.args || []);
        }
      }
    }

    while (params = core.dequeue()) {
      obj = core.extend({
        uid   : uid,
        userNick: wpo.getNick(),
        times   : params.times ? params.times : 1,
        _t    : ~new Date() + (count++).toString(),
        tag   : wpo.config.tag && safetyCall(wpo.config.tag, [], wpo.config.tag + '') || ''
      }, params);

      // 最后一次尝试补齐spm值
      if (!obj.spm) {
        obj.spm = wpo.getSpmId();
      }

      if (!obj.spm) {
        break;
      }

      if (wpo.debug && typeof window === 'object' && window.console) {
        console.log(obj);
      }

      sendRequest.call(wpo, config.imgUrl + core.query.stringify(obj));
    }

    timer = null;
  };

  /**
   * 延时发送
   *
   * @param _clear 是否立即发送
   * @param delay 延时多久发送
   * @private
   */
  var _wait = function (_clear) {
    if (_clear && timer) {
      clearTimeout(timer);
      _send();
    }
    if (!timer) {
      timer = setTimeout(_send, 1000);
    }
  };

  var core = {
    _key: 'wpokey',

    // 版本号
    ver: '<%= pkg.version %>',

    // dynamically updates itself without queue
    requestQueue: wpo.requestQueue || [],

    /**
     * 获取cookie
     *
     * @param name
     * @returns {*}
     */
    getCookie: function (name) {
      var reg,
        matches,
        cookie = '';

      if (!cookies[name]) {
        reg = new RegExp(name + '=([^;]+)');

        //
        // to make it compatible with nodejs
        //
        try {
          cookie = conf.getCookie(this);
        }
        catch (e) {

        }

        matches = reg.exec(cookie);
        if (matches) {
          cookies[name] = matches[1];
        }
      }

      return cookies[name];
    },

    /**
     * 设置cookie
     *
     * @param key
     * @param value
     * @param expires
     * @param domain
     * @param path
     */
    setCookie: function (key, value, expires, domain, path) {
      var str = key + '=' + value;
      if (domain) {
        str += ('; domain=' + domain);
      }
      if (path) {
        str += ('; path=' + path);
      }
      if (expires) {
        str += ('; expires=' + expires);
      }
      document.cookie = str;
    },

    /**
     * 扩展对象
     *
     * @param target
     * @returns {*}
     */
    extend: function (target) {
      var args = Array.prototype.slice.call(arguments, 1);

      for (var i = 0, len = args.length, arg; i < len; i++) {
        arg = args[i];
        for (var name in arg) {
          if (arg.hasOwnProperty(name)) {
            target[name] = arg[name];
          }
        }
      }

      return target;
    },

    /**
     * 获取guid
     *
     * @returns {string}
     */
    guid: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    /**
     * 发送请求
     *
     * @param params
     */
    send: function (params) {
      // 如果没有禁用wpo则上报, e.g., daily环境可禁用wpo上报,防止数据污染
      if (params && !wpo.config.disabled) {
        var spm = core.getSpmId();

        // 如果尚未设置过spm,并且成功获取到spm,则锁定spm值
        // 加入队列的时候即固定了此次上报的spm,方便SPA应用通过setConfig动态修改spm
        if (!params.spm && spm) {
          params.spm = spm;
        }

        this.queue(params);
      }
    },

    query: {
      /**
       * 对象转url字符串
       *
       * @param params
       * @returns {string}
       */
      stringify: function (params) {
        var arr = [];
        var str = '';

        // encodeURIComponent异常保护
        try {
          for (var name in params) {
            if (params.hasOwnProperty(name) && params[name] !== undefined) {
              var encodeInfo = '';
              if(name == 'spm'){
                encodeInfo = encodeURI(params[name]);
              } else {
                encodeInfo = encodeURIComponent(params[name]);
              }
              arr.push(name + '=' + encodeInfo);
            }
          }

          if (arr.length > 0) {
            str = arr.join('&');
          }
        }
        catch (e) {
        }

        return str;
      },

      /**
       * url字符串转对象
       *
       * @param str
       * @returns {{}}
       */
      parse: function (str) {
        var pairs = str.split('&'),
          obj   = {}, pair;

        // decodeURIComponent异常保护
        try {
          for (var i = 0, len = pairs.length; i < len; i++) {
            pair     = pairs[i].split('=');
            obj[pair[0]] = decodeURIComponent(pair[1]);
          }
        }
        catch (e) {
        }

        return obj;
      }
    },

    /**
     * 获取spmId
     *
     * @returns {*}
     */
    getSpmId: function () {
      if (config.spmId) {
        return config.spmId;
      }
      else if (typeof conf.getSpmId === 'function') {
        return conf.getSpmId.call(this);
      }

      return 0;
    },

    /**
     * 事件绑定
     *
     * @param el
     * @param type
     * @param func
     * @param isRemoving
     */
    on: function (el, type, func, isRemoving) {
      if (el.addEventListener) {
        el.addEventListener(type,
          isRemoving ? function () {
            el.removeEventListener(type, func, false);
            func();
          } : func,
          false);
      }
      else if (el.attachEvent) {
        el.attachEvent('on' + type, function () {
          if (isRemoving) {
            el.detachEvent('on' + type, arguments.callee);
          }
          func();
        });
      }
    },

    /**
     * 获取用户的taobao nick
     *
     * @returns {*}
     */
    getNick: function () {
      var nick = '';

      try {
        // 优先取业务方主动配置的nick
        if (wpo.config.nick) {
          nick = wpo.config.nick;
        }
        // 否则从cookie中读取
        else {
          // 分别取淘宝PC,淘宝无线,商家子账号cookie
          nick = this.getCookie('_nk_') || this.getCookie('lgc') || this.getCookie('_w_tb_nick') || this.getCookie('sn') || '';
          nick = decodeURIComponent(nick);
        }
      }
      catch (e) {
      }

      return nick;
    },

    /**
     * 设置config
     * @param inConfig
     * @returns {*}
     */
    setConfig: function (conf) {
      if (conf && typeof conf !== 'object') {
        throw 'args of wpo.setConfig is not object';
        return;
      }

      // weex环境
      if (conf && conf.user && typeof conf.user.getUserInfo === 'function' && this.env === 'weex') {
        // 设置nick
        conf.user.getUserInfo(function (resStr) {
          try {
            var res = JSON.parse(resStr);

            core.extend(config, {
              nick: res.info && res.info.nick
            });
          }
          catch (e) {
          }
        });
      }

      return core.extend(config, conf);
    },

    /**
     * 快捷配置spm,返回wpo自身方便链式调用
     *
     * @param spm
     * @returns {core}
     */
    spm: function (spm) {
      if (spm) {
        this.setConfig({
          spmId: spm
        })
      }

      return this;
    },

    /**
     * 动态配置
     *
     * @param obj
     */
    dynamicConfig: function (obj) {
      var config = this.query.stringify(obj);

      try {
        localStorage.setItem(this._key, config);
      }
      catch (e) {
        this.setCookie(this._key, config, new Date(obj.expTime));
      }
      this.setConfig({
        sample: parseInt(obj.sample, 10)
      });
      this.ready();
    },

    /**
     * ready
     *
     */
    ready: function () {
      var _ready = function () {
        wpo._ready = true;
        _wait();
      };

      if (wpo.config.delayOfReady) {
        setTimeout(function () {
          _ready();
        }, wpo.config.delayOfReady)
      }
      else {
        _ready();
      }
    },

    /**
     * 加入请求队列
     *
     * @param obj
     */
    queue: function (obj) {
      var queue = this.requestQueue, compare;

      if (obj.type === 'jserror') {
        if (queue.length) {
          compare = queue[queue.length - 1];

          if (obj.msg === compare.msg) {
            compare.times++;
            return;
          }
        }
        if (!obj.times) {
          obj.times = 1;
        }
      }

      queue.push(obj);

      if (this._ready) {
        if (obj.type === 'jserror') {
          // js error延时1s发送,方便合并大量同类错误
          _wait(false, 1000);
        }
        else {
          _send();
        }
      }
    },

    /**
     * 从请求队列取头部取一个(第一个)
     *
     * @returns {T}
     */
    dequeue: function () {
      return this.requestQueue.shift();
    },

    /**
     * clear
     */
    clear: function () {
      _wait(true);
    }
  };

  core.uid = (uid = core.guid());
  core.config = core.setConfig(wpo.config);
  core.extend(wpo, core);

  root.__WPO = wpo;

  return wpo;
};