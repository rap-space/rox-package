import Rap from './rap';
import { isWeex, isWeb } from './env';

function requestByRap(options, successCallback, failureCallback) {
  if (isWeb) {
    console.warn('请使用【阿里巴巴-客户端】调用此接口');
    return null;
  }

  return Rap.call({
    className: 'mtop',
    methodName: 'request',
    options
  })
    .then(successCallback, failureCallback);
}

export default {
  request: requestByRap
};
