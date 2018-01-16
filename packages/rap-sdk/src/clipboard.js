import { requireModule } from './rap';
import { log } from './util';

let clipboard = {
  setString: function(str) {
    if (typeof str === 'string') {
      clipboard.setString(str);
    } else {
      log.error('arguments type error');
    }
  },

  getString: function(callback) {
    clipboard.getString((res) => {
      // let info = {}
      callback && callback(res);
    });
  },
};

export default clipboard;