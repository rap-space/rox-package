import { isWeex, isWeb, isNode } from 'universal-env';

let GLOBAL_SPM;

if (isNode) {
  global.window = {}; // eslint-disable-line
}

if (typeof window.__UNIVERSAL_SPM__ !== 'undefined') {
  GLOBAL_SPM = window.__UNIVERSAL_SPM__;
} else {
  let spmAB = ['0', '0'];
  GLOBAL_SPM = {
    getPageSPM() {
      if (isWeb && window.goldlog) {
        const spm_ab = window.goldlog.spm_ab;
        spmAB = spm_ab && Array.isArray(spm_ab) && spm_ab.join('.') !== '0.0' ? spm_ab : spmAB;
      }
      return spmAB;
    },

    getSPM(c, d) {
      return [].concat(this.getPageSPM(), c || 0, d || 0);
    },

    getSPMQueryString(c, d) {
      return 'spm=' + this.getSPM(c, d).join('.');
    },

    setPageSPM(a, b) {
      spmAB[0] = a;
      spmAB[1] = b;

      if (isWeex) {
        // pageInfo module is now deprecated
        // https://doc.weex.alibaba-inc.com/modules/oldModules.html
      } else if (isWeb) {
        if (window.goldlog && window.goldlog.setPageSPM) {
          window.goldlog.setPageSPM(a, b);
        } else {
          const q = window.goldlog_queue || (window.goldlog_queue = []);
          q.push({
            action: 'goldlog.setPageSPM',
            arguments: [a, b]
          });
        }
      } else {
      }
    }
  };
  window.__UNIVERSAL_SPM__ = GLOBAL_SPM;
}

export default GLOBAL_SPM;
