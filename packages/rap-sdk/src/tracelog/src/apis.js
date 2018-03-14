module.exports = function (wpo, undef) {
  // startTime配置兼容
  var startTime = wpo.startTime || wpo.config.startTime;
  var scriptStart = startTime;

  if (!startTime) {
    try {
      startTime   = window.performance.timing.responseStart || +new Date();
      scriptStart = +new Date();
    }
    catch (e) {
      scriptStart = startTime = +new Date();
    }
  }

  var send = function (params, sampling) {
    sampling = sampling || wpo.config.sample;

    //
    // 双十一当天统计数据抽样率降低
    //

    // if ((curDate.getUTCDate() == 10 && curDate.getUTCMonth() == 10 && curDate.getUTCHours() >= 16) ||
    //   (curDate.getUTCDate() == 11 && curDate.getUTCMonth() == 10)) {
    //   sampling *= 10;
    // }

    // retcode api上报做特殊处理
    if (wpo.sampling(sampling, params.type == 'retcode') == (wpo.config.modVal || 1)) {
      params.sampling = sampling;
      wpo.send(params);
    }
  };

  /**
   * [custom description]
   * @param  {[int/string]} category [0/'time'，1/'count']
   * @param  {[string]} key    [自定义值]
   * @param  {[any]} value  [自定义值，如果type为count，自动忽略该值]
   * @return {[void]}
   */
  wpo.custom = function (category, key, value) {
    var customParam = {
        type: 'custom'
      },
      arr     = ['time', 'count'];

    category = arr[category] || category;

    if (category == 'time' || category == 'count') {
      customParam['category'] = category;
    }

    if (customParam.type) {
      customParam['key']   = key;
      customParam['value'] = category == 'time' ? value : undef;
      send(customParam);
    }
  };


  /**
   * 过滤规则检测 filter by pattern
   * @param  {String} msg
   * @param  {*} filterPattern
   * @return {Boolean} 是否被略过
   */
  var filterErrMsg = function(msg,filterPattern){
    // 空白消息省略
    if (!msg) return true;
    if (!filterPattern) return false;
    try {
      var type = Object.prototype.toString.call(filterPattern).substring(8).replace(']', '');

      if (type === 'Function') {
        return !!filterPattern(msg);
      } else if (type === 'RegExp') {
        return filterPattern.test(msg);
      } else if (type === 'String') {
        return msg.indexOf(filterPattern)>=0
      }
    } catch (err) {
      if(typeof window === 'object' && window.console){
        console.error('retcode log errMsgFitler error', err);
      }
    }

    // 未识别的过滤规则统一不过滤
    return false;
  };

  /**
   * [error description]
   * @param  {[str]} category [可选参，错误类型，默认为sys]
   * @param  {[str]} msg    [自定义错误信息]
   * @return {[void]}
   */
  wpo.error = function (category, msg, file, line, col, stack) {
    var errorParam = {
      type: 'jserror'
    };

    if (arguments.length === 1) {
      msg    = category;
      category = undefined;
    }

    // 有错误信息才上报
    if (msg) {
      errorParam['category'] = category || 'sys';
      if(typeof msg == 'object' && msg.message){ //event处理https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent
        var msgEvent = msg;
        try {
          msg = msgEvent.message;
          file = file || msgEvent.filename;
          line = line || msgEvent.lineno;
          col = col || msgEvent.colno;
        } catch(e){

        }
      } else {
        if(typeof msg === 'object'){
          try {
            msg = JSON.stringify(msg);
          } catch(e){

          }
        }
      }
      try {
        if(msg){
          msg = msg.substring(0, 1e3);
        } else {
          msg = '';
        }

      } catch(e){
        msg = '';
      }
      stack = stack ? stack.substring(0, 1e3) : ''; //限制1000个字符
      errorParam['msg']    = msg;

      // 若有设置errMsgFilter
      if(wpo.config && wpo.config.errMsgFilter){
        // 检测符合规则直接忽略
        if(filterErrMsg(msg,wpo.config.errMsgFilter)) return;
      }

      // separate msg file name
      if (file) {
        errorParam['file'] = file;
      }

      if (line) {
        errorParam['line'] = line;
      }

      if (col) {
        errorParam['col'] = col;
      }

      if (stack) {
        errorParam['stack'] = stack;
      }

      send(errorParam, 1);
    }
  };

  /**
   * [performance description]
   * @param  {[obj]} params [性能相关信息]
   * @return {[void]}
   */
  wpo.performance = function (params) {
    var perParam = {
      type: 'per'
    };

    send(wpo.extend(perParam, params));
  };

  /**
   * [retCode description]
   * @param  {[str / obj]} api     [所调用的api]
   * @param  {[boolean]} issuccess [是否成功，不成功会100%发送，成功按照抽样发送]
   * @param  {[type]} delay  [调用时间]
   * @param  {[type]} code   [错误码]
   * @param  {[type]} msg    [错误详情]
   * @return {[void]}
   */
  wpo.retCode = function (api, issuccess, delay, code, msg) {
    var retParam = {
      type: 'retcode',
      sampling: this.config.retCode[api]
    };

    if(typeof api === 'object') {
      //新接口
      try {
        api.msg = api.msg ? api.msg.substring(0, 1e3) : '';
      } catch(e){
        api.msg = ''
      }
      retParam.sampling = api.api ? this.config.retCode[api.api] : 1;
      retParam.api = api.api;
      retParam.issucess = api.issuccess;
      retParam.delay = (typeof api.delay == 'number' ? parseInt(api.delay, 10) : (new Date() - startTime));
      retParam.msg = api.msg || (api.issuccess ? 'success' : 'fail');
      retParam.detail = api.detail || '';
      retParam.traceId = api.traceId || '';

      retParam = wpo.extend(api, retParam);
      delete retParam['issuccess'];
    } else {
      //兼容老的接口
      try {
        msg = msg ? msg.substring(0, 1e3) : '';
      } catch(e){
        msg = ''
      }
      retParam = wpo.extend({
        api   : api,
        issucess: issuccess,
        delay   : typeof delay == 'number' ? parseInt(delay, 10) : (new Date() - startTime),
        msg   : code || (issuccess ? 'success' : 'fail'),
        detail  : msg || ''
      }, retParam);
    }

    if (typeof retParam.delay !== 'undefined' && typeof retParam.issucess !== 'undefined') {
      send(retParam, retParam.issucess ? retParam.sampling : 1);
    }
  };

  var sendSpeed = function () {
    var perParam = {
      type: 'speed'
    }, val;

    for (var i = 0, len = wpo.speed.points.length; i < len; i++) {
      val = wpo.speed.points[i];
      if (val) {
        perParam['s' + i]   = val;
        wpo.speed.points[i] = null;
      }
    }

    send(perParam);
  };

  /**
   * [speed description]
   * @param  {[int/str]} pos      [0/'s0',1/'s1',2/'s2'....10/'s10']
   * @param  {[int]} delay    [耗时，如果没有定义，这按照当前时间减去页面起始时间]
   * @param  {[boolean]} _immediately [内部使用，是否强制发送，不强制发送会尽量收集3s内的所有点的数据一次性发送]
   * @return {[void]}
   */
  wpo.speed = function (pos, delay, _immediately) {
    var sArr;

    if (typeof pos == 'string') {
      pos = parseInt(pos.slice(1), 10);
    }

    if (typeof pos == 'number') {
      sArr = wpo.speed.points || new Array(11);

      sArr[pos] = typeof delay == 'number' ?
        (delay > 86400000 ? delay - startTime : delay ) : new Date() - startTime;

      if (sArr[pos] < 0) {
        sArr[pos] = new Date() - scriptStart;
      }

      wpo.speed.points = sArr;
    }

    clearTimeout(wpo.speed.timer);

    if (!_immediately) {
      wpo.speed.timer = setTimeout(sendSpeed, 3000);
    }
    else {
      sendSpeed();
    }
  };

  /**
   * [log 日志统计]
   * @param  {[string]} msg    [发送的内容]
   * @param  {[int]} sampling [可以自定义发送的抽样]
   * @return {[void]}
   */
  wpo.log = function (msg, sampling) {
    var param = {
      type: 'log',
      msg : msg
    };

    send(param, sampling);
  };
};
