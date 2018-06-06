import { requireModule } from '../rap/weex-module';
import { isWeex } from '../env';
import {parse2json} from '../util';


function getIdentity() {
  return new Promise(function(resolve, reject) {
    if (isWeex) {
      let Windvane = requireModule('windvane');
      if (Windvane && Windvane.call) {
        Windvane.call({
          class: 'AliHelper',
          method: 'isBuyer',
          data: {}
        }, (e) => {
          let res = parse2json(e);
          if (String(res.success) === 'true') {
            let data = res.data;
            if (data) {
              resolve({
                isBuyer: String(data.isBuyer) === 'true'
              });
            }
          } else {
            reject({
              msg: '格式 不符合标准'
            });
          }
        });
      }
    } else {
      reject({
        msg: '不支持此Bridge'
      });
    }
  });
}

export default { getIdentity };
