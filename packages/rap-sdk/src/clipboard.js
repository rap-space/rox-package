import { requireModule } from './rap';
import { log } from './util';

let _clipboard = requireModule('clipboard');
let clipboard = {
  setString: function(str) {
    if (typeof str === 'string') {
      _clipboard.setString(str);
    } else {
      log.error('arguments type error');
    }
  },

  getString: function(callback) {
    _clipboard.getString((res) => {
      // let info = {}
      callback && callback(res);
    });
  },
};

export default clipboard;