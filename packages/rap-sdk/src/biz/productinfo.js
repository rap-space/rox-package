import { each } from '../_util';

// function each(obj, iterator, context = null) {
//   for (var key in obj) {
//     if (!obj.hasOwnProperty(key)) continue;
//     if (iterator.call(context, obj[key], key, obj) === false) break;
//   }
// }
// 未来
const bizInfo = {
  'trade': {
    'url': 'https://trade.m.1688.com/page/sellerOrderList.html',
    'name': '订单管理'
  },
  'popularize': {
    url: 'https://cui.m.1688.com/weex/page/5477.html?__positionId__=PRODUCT_1&__pageId__=5477&__native__=true',
    'name': '营销推广'
  },
  'winport': {
    'url': 'https://winport.m.1688.com/page/index.html',
    'name': '旺铺',
    'query': ['memberId']
  },
  'winportDecorate': {
    name: '旺铺装修',
    url: 'https://yunying.m.1688.com/page/mobileTemplateList.html?__existtitle__=1'
  },
  'publishOffer': {
    name: '发布商品',
    url: 'https://h5.m.1688.com/offer/page/postoffer.html'
  },
  'refundDetail': {
    'name': '退款详情',
    'url': 'https://refund.m.1688.com/page/refundDetail.html',
    'query': ['refundId', 'userType']
  },
  'orderDetail': {
    'name': '订单详情',
    'url': 'http://h5.m.1688.com/trade/page/orderDetail.html',
    'query': ['orderId']
  },
  changeDefaultApp: {
    'name': '设置默认插件',
    'url': 'https://air.1688.com/apps/alim/open/commodity-management.html',
    'query': ['categoryName']
  }
};

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 包含了 映射 逻辑
function queryToString(query, queryMap) {
  let arr = [];
  each(query, (val, key) => { // 用户
    let queryKey = key;
    if (queryMap && queryMap[key]) {
      // console.log('queryMap[key]', queryMap[key]);
      queryKey = queryMap[key];
    }
    arr.push(`${queryKey}=${val}`);
  });
  return arr.join('&');
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

function getBizInfoUrl(type, query) {
  let info = getBizInfo(type);
  let getParamStr = queryToString(query, info.queryMap);
  let infoUrl = info.url;
  let url;
  if (infoUrl.indexOf('?') >= 0) {
    url = info.url + getParamStr;
  } else {
    url = info.url + '?' + getParamStr;
  }
  return url;
}


// getBizInfo, {}
export default { getBizInfo, getBizInfoUrl };