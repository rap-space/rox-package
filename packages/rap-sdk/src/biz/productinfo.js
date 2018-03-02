const bizInfo = {
  'trade': {
    'url': 'https://trade.m.1688.com/page/sellerOrderList.html',
    'name': '订管管理'
  },
  'popularize': {
    url: 'https://cui.m.1688.com/weex/page/5477.html?__positionId__=PRODUCT_1&__pageId__=5477&__native__=true',
    'name': '营销推广'
  },
  'winport': {
    'url': 'https://winport.m.1688.com/page/index.html',
    'name': '旺铺',
    'params': ['memberId']
  },
  'winportDecorate': {
    name: '旺铺装修',
    url: 'https://yunying.m.1688.com/page/mobileTemplateList.html?__existtitle__=1'
  },
  'publishOffer': {
    name: '发布商品',
    url: 'https://offer.m.1688.com/page/postoffer.html'
  },
  'refundDetail': {
    'name': '退款详情',
    'url': 'https://refund.m.1688.com/page/refundDetail.html',
    'params': ['refundId', 'userType']
  }
};
function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function getBizInfo(type) {
  let appInfo = bizInfo[type];
  if (appInfo) {
    return copy(appInfo);
  } else {
    console.error(`不存在 ${type}`);
    return copy(bizInfo);
  }
}

export default getBizInfo;