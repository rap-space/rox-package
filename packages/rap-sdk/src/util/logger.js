import Location from '../location';
import { isWeex } from '../env';
// import user from './user';

let href = Location.href;

// 是否已经获取 uid 标记位
let hasTryUid = false;

// 默认日志配置
let logItem = {
  pid: 'rap-sdk',
  page: Location.href,
  ua: navigator.userAgent,
};

/**
 * 将对象序列化
 * @param {Object} obj k-v 参数对
 */
const toQueryString = (obj) => {
  var arr = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] != null && obj[key] !== '') {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }
  return arr.join('&');
};

// 将参数数组序列化
const toString = args => {
  if (args instanceof Array ) {
    return args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg.toString()).toString();
  }
  return args;
};


/**
 * 发送日志请求
 */
const cache = [];
const postData2Server = item => {
  // 500 ms 内 cache
  item && cache.push(item);

  // 尝试获取 uid，还未完成的，直接返回
  if (!hasTryUid) return;

  setTimeout(() => {
    while (cache.length > 0) {
      const item = cache.pop();
      item.uid = logItem.uid;

      console.log('logger: ' + toQueryString(item));

      if (isWeex) {
        fetch(`http://gm.mmstat.com/fsp.1.1?${toQueryString(item)}`, { method: 'GET' });
      } else {
        new Image().src = `http://gm.mmstat.com/fsp.1.1?${toQueryString(item)}`;
      }
    }
  }, 500);
};

/**
 * 格式化上传数据
 */
const formatLog = (code, msg, ext = {}) => ({
  ...logItem,
  code,
  msg: toString(msg),
  ...ext,
});

/**
 * 日志对象 log, warn, info, error, api, debug
 */
const logger = {
  log(...args) {
    postData2Server(formatLog(11, args));
  },
  warn(...args) {
    postData2Server(formatLog(13, args));
  },
  info(...args) {
    postData2Server(formatLog(12, args));
  },
  error(...args) {
    const error = args[0];
    postData2Server(formatLog(1, toString(args.slice(1)) || args[0].message, {
      c1: error.stack && error.stack.slice(0, 500),
      c2: error.stack && error.stack.slice(500, 1000),
      c3: error.message,
    }));
  },
  api(name, params, time, result) {
    postData2Server(formatLog(14, name, {
      c1: name || '',
      c2: JSON.stringify(params) || '',
      c3: time || '-1',
      c4: JSON.stringify(result) || ''
    }));
  },
  debug(...args) {
    /rapDebugMode=1/.test(Location.href) && console.debug(args);
  },
};


// 尝试获取 uid 并做标记
try {
  const USER_MODULE = '@weex-module/user';
  const User = window.require(USER_MODULE);

  User.getUserInfo((data) => {
    try {
      data = JSON.parse(data);
      if (data.info.userId) {
        logItem.uid = data.info.userId;
      }
      hasTryUid = true;
    } catch (e) {
      hasTryUid = true;
    }
    postData2Server();
  });
} catch (e) {
  hasTryUid = true;
  if (isWeex) {
    logger.error(e);
  } else {
    logger.log('web 环境无法获取 userid');
  }
}

export default logger;
