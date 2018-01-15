import RapBridge from './rap';
import { each } from './util';

let className = 'biz';
let methodName = 'openShareComponent';

let share = function (query) {
    let _query = {
      title: query.title || false,
      textContent: query.content || false,
      shareUrl: query.content || false,
      mediaContent: query.image || false,
      targetUrl: query.href || false,
      showToast: 1,
      sharePlatforms: query.platforms || false,
    };

    each(_query, (v, k) => {
      if (!v) delete _query[k];
    });

    return RapBridge.call({
      className: className,
      methodName: methodName,
      param: param
    }, function (params) {
      callback && callback();
    });
}
export default share ;