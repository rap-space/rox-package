
import { isWeex } from '../env';

const isWindVane = typeof WindVane !== 'undefined';
let WV = {};

WV.call = function(className, method, data) {
  return new Promise((resolve, reject) => {
    if (isWeex) {
      let Windvane = require('@weex-module/windvane');

      const options = {
        class: className,
        method,
        data
      };

      if (Windvane.call2) {
        Windvane.call2(options, (result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
      } else if (Windvane.call) {
        Windvane.call(options, (result) => {
          resolve(result);
        });
      }
      // eslint-disable-next-line
    } else if (isWindVane && WindVane.isAvailable) {
      // eslint-disable-next-line
      WV.isAvailable = WindVane.isAvailable;
      // eslint-disable-next-line
      WindVane.call(className, method, data, (result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    } else {
      // 失败
      reject({
        msg: '浏览器不支持 windvane',
        ret: ['HY_NOT_SUPPORT_DEVICE']
      });
    }
  });
};

export default WV;
