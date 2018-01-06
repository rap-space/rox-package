import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

function each(obj, iterator, context = null) {
  if (isObject(obj) && !isArray(obj)) {
    for (var key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      if (iterator.call(context, obj[key], key, obj) === false) break;
    }
  } else if (isNumber(obj.length)) {
    for (var i = 0; i < obj.length; i++) {
      if (iterator.call(context, obj[i], i, obj) === false) break;
    }
  }
}


const EVENT_CENTER_TYPE = {
  page: 'RAPPageEventCenter',
  app: 'RAPAppEventCenter',
  global: 'RAPGlobalEventCenter',
};

/**
 * Slice event string such as:
 * balabala
 * balabala.xxx
 * page.balabala
 * @param  {String} ev            event string
 * @return {Object} result        slice result, an object of event info
 * @return {string} result.type   event type
 * @return {string} result.name   true event
 * @return {string} result.value  raw event passed in
 * @return {string} result.center event center to register in
 */

// PageEventCenter.back
function buildEventCenterByName(event) { // Page.back
  event = buildEventByName(event);
  event.center = EVENT_CENTER_TYPE[event.type];
  return event;
}

/**
 * Check if there is an array for holding event options in the options pool object, create one if not.
 * @param  {Object} optionsPool Options pool object
 * @param  {String} ev          Event name
 * @return {Array}              Options array of event
 */
function checkOptions(optionsPool, ev) {
  return optionsPool[ev] = optionsPool[ev] || [];
}

/**
 * Delete event options at indexes.
 * @param  {Array} options      Options array
 * @param  {Array}  indexes     Array of indexes to be deleted
 */
function deleteOptionsAtIndexes(options = [], indexes = []) {
  // Make indexes decrease and collaborate with `splice` to delete correctely
  each(indexes.sort().reverse(), (index) => {
    options.splice(index, 1);
  });
}

/**
 * Create a TypeError of callback
 * @param  {String} ev Event name
 * @return {TypeError}
 */
function callbackTypeError(ev) {
  return new TypeError(`Event callback for ${ev} must be function.`);
}

/**
 * buildEventObject string such as:
 * balabala
 * balabala.xxx
 * page.balabala
 * @param  {String} ev            event string
 * @return {Object} result        slice result, an object of event info
 * @return {string} result.type   event type
 * @return {string} result.name   true event
 * @return {string} result.value  raw event passed in
 * @return {string} result.center event center to register in
 */
function buildEventByName(eventName) {
  let reg = /^(page|app|global)\.(.+)$/i;

  /**
   * if none of formats below, prefix default type.
   * page.foo
   * app.foo.bar
   * global.foo.bar
   */
  if (!reg.test(eventName)) {
    eventName = 'page.' + eventName;
  }

  let match = eventName.match(reg);
  /**
   * lowercase to support different prefix like:
   * page.close
   * Page.close
   * Global.DidBecomeActive
   */
  let type = match[1].toLowerCase();
  let name = match[2];

  return {
    type,
    name,
    value: `${type}.${name}`,
  };
}

class EventEmitter {
  optionsPool = {
    // click: [{notify, once: false}],
    // touch: [{notify, once: true}],
  };

  constructor() {

  }

  /**
   * Register event
   * @param  {String}   ev              Event name
   * @param  {Function} callback        Event callback when event is emitted
   * @param  {Object}   settings        Register settings
   * @param  {Boolean}  settings.once   Indicate if callback can only be emitted once
   * @return {Promise}
   */
  on(ev, callback) {
    // on('page.back')
    let options = checkOptions(this.optionsPool, ev);
    if (isFunction(callback)) {
      options.push({notify: callback});
      return Promise.resolve();
    } else {
      let error = callbackTypeError(ev);
      return Promise.reject(error);
    }
  }


  /**
   * Unregister event
   * @param  {String}   ev              Event name
   * @param  {Function} callback        Event callback to be unregistered
   * @return {Promise}
   */
  off(ev, callback) {
    let options = checkOptions(this.optionsPool, ev);

    // Unregister all callbacks if no callback argument.
    if (!callback) {
      this.optionsPool[ev] = [];
      return Promise.resolve();
    }

    if (isFunction(callback)) {
      let indexes = [];
      each(options, (o, i) => {
        if (o.notify !== callback) return;
        indexes.push(i);
      });
      deleteOptionsAtIndexes(options, indexes);
      return Promise.resolve();
    } else {
      let error = callbackTypeError(ev);
      return Promise.reject(error);
    }
  }

  /**
   * Register event only once, automaticlly unregistered after the event is emitted.
   * @param  {String}   ev              Event name
   * @param  {Function} callback        Event callback when event is emitted
   * @return {Promise}
   */
  once(eventName, callback) {
    return this.on(eventName, callback, {once: true});
  }

  /**
   * Emit event
   * @param  {String} ev   Event name
   * @param  {Any}    arg[0] 1st arg passed to notify callback.
   * @param  {Any}    arg[1] 2nd arg passed to notify callback.
   * @param  {Any}    ...
   * @param  {Any}    arg[n] nth arg passed to notify callback.
   * @return {Promise}
   */
  emit(ev, ...args) {
    let options = checkOptions(this.optionsPool, ev);
    let indexes = [];
    each(options, (o, i) => {
      isFunction(o.notify) && o.notify(...args);
      o.once && indexes.push(i);
    });
    // Delete once options
    deleteOptionsAtIndexes(options, indexes);
    return Promise.resolve();
  }
}

export {
  buildEventCenterByName,
  EventEmitter
};
