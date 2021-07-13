import { each } from '../util';

// function each(obj, iterator, context = null) {
//   for (var key in obj) {
//     if (!obj.hasOwnProperty(key)) continue;
//     if (iterator.call(context, obj[key], key, obj) === false) break;
//   }
// }
// 未来
const bizInfo = {
  trade: {
    url: 'https://trade2.m.1688.com/page/sellerOrderList.html',
    name: '订单管理',
  },
  popularize: {
    url: 'https://cui.m.1688.com/weex/page/5477.html?__positionId__=PRODUCT_1&__pageId__=5477&__native__=true',
    name: '营销推广',
  },
  winport: {
    url: 'https://winport.m.1688.com/page/index.html',
    name: '旺铺',
    query: ['memberId'],
  },
  winportDecorate: {
    name: '旺铺装修',
    url: 'https://yunying.m.1688.com/page/mobileTemplateList.html?__existtitle__=1',
  },
  publishOffer: {
    name: '发布商品',
    url: 'https://h5.m.1688.com/offer/page/postoffer.html',
  },
  refundDetail: {
    name: '退款详情',
    url: 'https://refund2.m.1688.com/page/refundDetail.html',
    query: ['refundId', 'userType'],
  },
  orderDetail: {
    name: '订单详情',
    url: 'https://trade2.m.1688.com/page/orderDetail.html',
    query: ['orderId'],
  },
  offerDetail: {
    name: '商品详情',
    url: 'https://m.1688.com/offer/${offerId}.html',
    query: ['offerId'],
  },
  changeDefaultApp: {
    name: '设置默认插件',
    url: 'https://air.1688.com/apps/alim/open/commodity-management.html?wh_weex=true&',
    query: ['categoryName'],
  },
  '1688home': {
    name: '1688首页',
    url: 'https://home.m.1688.com/index.htm',
  },
  cashier: {
    name: '收银台',
    url: 'https://payment2.m.1688.com/page/cashier.html',
    /**
     * orderId，订单号，必填。若是合并付款，则以;（英文分号）分隔的订单号串，例：orderId=123456789;987654321
     */
    query: ['orderId'],
  },
  batchCashier: {
    name: '批量组合收银台',
    url: 'https://payment2.m.1688.com/page/batchPaymentCashier.html',
    /**
     * cashierOrderNo: 批量待付款订单的标识号，必填。注意这个不是订单号，可以通过调用支付中台的接口生成
     *
     * cashierType注意这个参数是兜底的，只有中台接口没返回的时候才支持这个参数
     *  cashierType=batch_standard  批量支付
     *  cashierType=batch_combination  组合支付
     */
    query: ['cashierOrderNo', 'cashierType'],
  },
  withholdManage: {
    name: '开通免密支付',
    url: 'https://meta2.m.1688.com/page/withholdManage.html',
  },
  distributionList: {
    name: '铺货单列表',
    url: 'https://sale.1688.com/sale/distribution/d/distribution-list.html?wh_pha=true&__existtitle__1&__pageId__=227417&cms_id=227417'
  }
};

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 包含了 映射 逻辑
function queryToString(query, queryMap) {
  let arr = [];
  if (!query) {
    return '';
  }
  each(query, (val, key) => {
    // 用户
    let queryKey = key;
    if (queryMap && queryMap[key]) {
      // console.log('queryMap[key]', queryMap[key]);
      queryKey = queryMap[key];
    }
    arr.push(`${queryKey}=${val}`);
  });
  return arr.join('&');
}

function getInfo(type) {
  let appInfo = bizInfo[type];
  if (appInfo) {
    return copy(appInfo);
  } else {
    console.error(`不存在 ${type}`);
    return copy(bizInfo);
  }
}

function getBizInfoUrl(type, query) {
  let info = getInfo(type);
  if (!type) {
    // 如果不存在返回info 信息方便查看
    return info;
  }
  let infoUrl = info.url;
  let url;

  if (type === 'offerDetail') {
    url = infoUrl.replace(/\${offerId}/, typeof query === 'number' ? query : query.offerId);
  } else {
    let getParamStr = queryToString(query, info.queryMap);
    if (getParamStr) {
      if (infoUrl.indexOf('?') >= 0) {
        url = info.url + '&' + getParamStr;
      } else {
        url = info.url + '?' + getParamStr;
      }
    } else {
      url = info.url;
    }
  }

  return url;
}

function getBizInfo(type) {
  console.error('getBizInfo 已废弃, 请立即使用 getBizInfoUrl 代替, 否则可能会引起页面异常');
  return getInfo(type);
}

// getBizInfo, {}
export default { getBizInfo, getBizInfoUrl };
