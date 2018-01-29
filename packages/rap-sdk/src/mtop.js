import Rap from './rap';

function requestByRap(options, successCallback, failureCallback) {
  return Rap.call({
    className: 'mtop',
    methodName: 'request',
    options}).then(successCallback, failureCallback);
}

export default {
  request: requestByRap
};