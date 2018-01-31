import { requireModule } from './rap';
import { log } from './util';

const _clipboard = requireModule('clipboard');

const clipboard = {
  setString(str) {
    if (typeof str === 'string') {
      _clipboard.setString(str);
    } else {
      log.error('arguments type error');
    }
  },
  getString(callback) {
    _clipboard.getString((res) => {
      callback && callback(res);
    });
  }
};

export default clipboard;
