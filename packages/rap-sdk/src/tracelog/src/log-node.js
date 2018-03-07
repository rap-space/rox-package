this.__WPO = {
  // env设置
  env: 'nodejs'
};

require('./core')(this.__WPO, this, require('./conf-node'));
require('./sampling')(this.__WPO);
require('./apis')(this.__WPO);

this.__WPO.ready(true);

module.exports = this.__WPO;