var root = {
  __WPO: {
    // env设置
    env: 'weex'
  }
};

require('./core')(root.__WPO, root, require('./conf-weex'));
require('./sampling')(root.__WPO);
require('./apis')(root.__WPO);

setTimeout(function() {
  root.__WPO.ready(true);
}, 0);

module.exports = root.__WPO;