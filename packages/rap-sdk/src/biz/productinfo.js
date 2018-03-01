const bizInfo = {
  'trade': {
    'url': 'http://trade.m.1688.com/page/sellerOrderList.html',
    'name': '订管管理'
  },
  'popularize': {
    url: 'https://cui.m.1688.com/weex/page/5477.html?__positionId__=PRODUCT_1&__pageId__=5477&__native__=true',
    'name': '营销推广'
  },
  'winport': {
    'url': 'http://winport.m.1688.com/page/index.html',
    'name': '旺铺',
    'params': ['memberId']
  },
  'winportDecorate': {
    name: '旺铺装修',
    url: 'https://yunying.m.1688.com/page/mobileTemplateList.html?__existtitle__=1'
  },
  'publishOffer': {
    name: '发布商品',
    url: 'http://offer.m.1688.com/page/postoffer.html'
  }
};

function getBizInfo(type) {
  let appInfo = bizInfo[type];
  if (appInfo) {
    return appInfo;
  } else {
    console.error(`不存在 ${type}`);
  }
}
export default getBizInfo;