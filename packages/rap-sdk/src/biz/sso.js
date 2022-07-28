import navigator from '../navigator';
import { getAppKey } from '../util';

const authURL = 'https://air.1688.com/apps/alim/open/authorize.html?appKey=';
const sso = {
  goAuth: function() { // 最好支持事件
    // getAppKey;
    let appKey = getAppKey();
    let url = `${authURL}${appKey}`;
    navigator.push({
      url: url
    });
  }
};

export default sso;
