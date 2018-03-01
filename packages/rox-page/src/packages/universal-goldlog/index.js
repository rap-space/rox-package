import { isWeex, isWeb, isNode } from 'universal-env';
import SPM from '../universal-spm';
import {
  paramsToObj,
  getParamFromURL,
  getMetaContentByName,
  simplifyURL,
  makeChkSum
} from './utils';

if (isNode) {
  global.window = {}; // eslint-disable-line
}

const DEFAULT_WEEX_GM_KEY = 'click';
const WEEX_GM_KEY_MAP = {
  CLK: 'click',
  EXP: 'expose',
  OTHER: 'other'
};

const goldlog = {
  record(logkey, gmkey, gokey, chksum) {
    if (isWeex) {
      let logkeyargs = paramsToObj(gokey);
      logkeyargs.weex = logkeyargs.weex ? logkeyargs.weex : '1';
      logkeyargs.autosend = '1';

      let weexGmKey = WEEX_GM_KEY_MAP[gmkey];
      weexGmKey = weexGmKey || DEFAULT_WEEX_GM_KEY;

      let params = {
        logkey,
        // http://velocity.alibaba-inc.com/issues/2883
        // logkeyargs: objToParams(logkeyargs),
        weex: 1,
        autosend: 1,
        urlpagename: '',
        url: logkeyargs.url || location && location.href || '', // 完整 url
        'spm-cnt': SPM.getSPM().join('.'),
        cna: '', // 访客 id
        extendargs: JSON.stringify({}),
        isonepage: 0,
        _lka: JSON.stringify({
          gmkey,
          gokey
        }),
        gokey: gokey,
      };

      let UserTrack = require('@weex-module/userTrack');

      // new API from ut module
      if (UserTrack.commitut) {
        let pageName = logkeyargs.name || params.url;
        let arg1 = logkey;
        let arg2 = '';
        let arg3 = '';

        switch (weexGmKey) {
          case 'expose':
            UserTrack.commitut(weexGmKey, 2201, pageName, '', arg1, arg2, arg3, params);
            break;
          case 'other':
            UserTrack.commitut(weexGmKey, 19999, pageName, '', arg1, '', '', params);
            break;
          case 'click':
          default:
            // call this API to avoid arg1 to be pageName_logkey
            if (UserTrack.customAdvance) {
              UserTrack.customAdvance(pageName, 2101, arg1, arg2, arg3, params);
            } else {
              UserTrack.commitut(weexGmKey, 2101, pageName, arg1, '', '', '', params);
            }
            break;
        }
      } else if (UserTrack.commit) { // old story
        UserTrack.commit(weexGmKey, logkey, logkey, params);
      }
    } else if (isWeb && window.goldlog) {
      window.goldlog.record(logkey, gmkey, gokey, chksum);
    } else {
      // Noop
    }
  },

  launch(pageSPM = SPM.getPageSPM(), params = {}) {
    let checksum = makeChkSum(pageSPM.join('.'));
    // handle logConfig
    const logConfig = {
      // checksum: http://on.alibaba.net/
      checksum,
      is_auto: false,
      page_id: ''
    };

    // special logic for logConfig
    if (params.page_id) {
      logConfig.page_id = params.page_id;
      delete params.page_id;
    }


    if (isWeex) {
      // first of all, set spm-ab code for current page.
      SPM.setPageSPM(pageSPM[0], pageSPM[1]);

      let UserTrack = require('@weex-module/userTrack');

      params.url = params.url || location && location.href || '';
      params['spm-cnt'] = SPM.getPageSPM().join('.') + '.0.0';
      params['spm-url'] = getParamFromURL(params.url, 'spm') || '0.0.0.0';
      params.scm = getParamFromURL(params.url, 'scm') || '0.0.0.0';
      params.cna = '';
      params.weex = 1;

      const name = params.name || simplifyURL(params.url);

      if (UserTrack.enterEvent) {
        UserTrack.enterEvent(name, params);
      } else if (UserTrack.commit) {
        UserTrack.commit('enter', name, '', params);
      }
    } else if (isWeb) {
      const waiting = !!getMetaContentByName('aplus-waiting');

      // only sendPV when aplus-waiting is already set in web
      if (waiting) {
        // http://groups.alidemo.cn/alilog/manual-for-f2e/api/goldlog.html
        const q = window.goldlog_queue || (window.goldlog_queue = []);

        q.push({
          action: 'goldlog.setPageSPM',
          arguments: [pageSPM[0], pageSPM[1]]
        });

        q.push({
          action: 'goldlog.sendPV',
          arguments: [logConfig, params]
        });
      } else if (window.goldlog && window.goldlog.setPageSPM) {
        // first of all, set spm-ab code for current page.
        window.goldlog.setPageSPM(pageSPM[0], pageSPM[1], () => {
          window.goldlog.sendPV && window.goldlog.sendPV({checksum});
        });
      }
    } else {

    }
  }
};

goldlog.sendPV = goldlog.launch;

export default goldlog;
