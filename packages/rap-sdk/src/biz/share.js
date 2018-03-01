import Rap from '../rap';
import { each } from '../_util';

let className = 'biz';
let methodName = 'openShareComponent';
let url = 'http://cui.m.1688.com/weex/weex_dacu/3139.html?__positionId__=weex_dacu&__pageId__=3139&__weex__=true';
let picUrl = 'https://gw.alicdn.com/tfs/TB1isFOcgMPMeJjy1XcXXXpppXa-750-473.jpg_10000x340q60.jpg';

let share = function(options, callback) {
  let share = Rap.requireModule('share');
  callback = callback || function() {};
  if (!share.doShare) {
    console.error('no support share');
    return;
  }
  options = options || {};

  // @shareToken@
  // @shareUrl@
  let param = {};
  param.title = options.title;
  param.url = options.url;
  if (options.picUrl) {
    param.picUrl = options.picUrl;
  }
  // 好像无用
  // param.content = options.content;
  param.webUrl = options.webUrl;

  param.formWhere = options.formWhere;
  param.companyName = options.companyName;

  param.leftButtonName = options.leftButtonText;
  param.rightButtonName = options.rightButtonText;

  param.isUserToken = options.isUserToken;
  param.typeQr = judgeTypeQr(options.typeQr);
  param.template = formatTemplate(options.template, options.isUserToken);

  share.doShare &&　share.doShare(param, callback);
};

function judgeTypeQr(type) {
  // typeQr: 当isUserToken 为false 的时候可用， WEB 【text, imgtext, web】
  let typeQr = {
    text: 1,
    imgtext: 1,
    web: 1
  };

  if (typeQr[type]) {
    return type;
  } else {
    console.log('不存在');
    return '';
  }
}

function formatTemplate(str, isUserToken) {
  let TOKEN_FLAG = '@shareToken@';
  let URL_FLAG = '@shareUrl@';
  let res;
  if (isUserToken) {
    res = str.replace(TOKEN_FLAG, 'sk_share_token').replace(URL_FLAG, 'sk_share_url');
  } else {
    res = str.replace(TOKEN_FLAG, '').replace(URL_FLAG, '');
  }
  return res;
}

export default share;
