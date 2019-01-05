
import RapBridge from '../rap';
import { isWeex, isWeb } from '../env';
import { buildEventCenterByName, EventEmitter} from './emmiter';

let eventEmitter = new EventEmitter();
let onPromises = {
  // page.balabala: Promise,
  // app.haha: Promise,
};

const Event = {
  on: function(eventName, callback) {
    if (isWeb) {
      eventEmitter.on(eventName, callback);
      return;
    }
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
      }, function(event) {
        // 设置默认 scope 为 app 级别
        event.value = (event.scope && event.scope.toLowerCase() || 'app') + '.' + event.name;
        eventEmitter.emit(event.value, event.info);
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

    // return RapBridge.call({
    //   className: event.center,
    //   methodName: 'removeListener',
    //   param: {
    //     eventName: event.name
    //   }
    // });
  },

  emit: function(eventName, options) {
    if (isWeb) {
      eventEmitter.emit(eventName, options);
      return new Promise(resolve => resolve());
    }
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
