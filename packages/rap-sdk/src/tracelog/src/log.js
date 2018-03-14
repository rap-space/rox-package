/**
 * retcode/log
 *
 * @Author xianqian.rxq@alibaba-inc.com
 * @Date 2016-10-09
 * @copyright(c) Alibaba Group Holding Limited.
 */

var isBrowser = typeof window === 'object' && !!window.navigator;
var isNodejs = typeof process === 'object' && process + '' === '[object process]';
var isWeex = typeof callNative === 'function';

// weex
if (isWeex) {
  module.exports = require('./log-weex');
} else if (isNodejs) {
  module.exports = require('./log-node');
} else {
  module.exports = require('./log-browser');
}