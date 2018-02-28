import { requireModule } from './rap';
import { logger } from './_util';

const _clipboard = requireModule('clipboard');

const clipboard = {
  setString(str) {
    if (typeof str === 'string') {
      _clipboard.setString(str);
    } else {
      logger.error('arguments type error');
    }
  },
  getString(callback) {
    _clipboard.getString((res) => {
      callback && callback(res);
    });
  }
};

export default clipboard;
