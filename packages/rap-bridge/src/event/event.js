
import RapBridge from '../rap';
import { buildEventCenterByName, EventEmitter} from './emmiter';

let eventEmitter = new EventEmitter();
let onPromises = {
  // page.balabala: Promise,
  // app.haha: Promise,
};
const Event = {
  on: function(eventName, callback) {
    // back
    // Page.back
    // App.back
    // Global.didBecomine;
    let event = buildEventCenterByName(eventName);
    if (!onPromises[event.value]) {
      onPromises[event.value] = RapBridge.call({
        className: event.center,
        methodName: 'addListener',
        param: {
          eventName: event.name
        }
      }, function(info) {
        // 这里预处理一些信息
        callback &&　callback(info);
      });
    }

    let promise = onPromises[event.value];
    promise.catch(error => {
      delete onPromises[event.value];
    });
    return promise
      .then(() => {
        eventEmitter.on(event.value, callback);
      });
  },
  off: function(eventName, callback) {
    let event = buildEventCenterByName(eventName);
    return eventEmitter.off(event.value, callback)
      .then(result => {
        let options = eventEmitter.optionsPool[event.value];
        if (options.length > 0) return result;
        if (!onPromises[event.value]) return result;
        return RapBridge.call({
          className: event.center,
          methodName: 'removeListener',
          param: {
            eventName: event.name
          }
        }).then(result => {
          delete onPromises[event.value];
        });
      });
  },

  emit: function(eventName, options) {
    let event = buildEventCenterByName(eventName);
    return RapBridge.call({
      className: event.center,
      methodName: 'fireEvent',
      param: {
        eventName: event.name,
        info: options
      }
    });
  }
};
export default Event;