import RapBridge from './rap';

let localstore = {
  getItem(key) {
    return RapBridge.call({
      className: 'localstore',
      methodName: 'getItem',
      param: {
        key: key
      }
    });
  },
  setItem(key) {
    return RapBridge.call({
      className: 'localstore',
      methodName: 'setItem',
      param: {
        key: key
      }
    });
  },
  removeItem(key) {
    return RapBridge.call({
      className: 'localstore',
      methodName: 'removeItem',
      param: {
        key: key
      }
    });
  },
  getItemsKey() {
    return RapBridge.call({
      className: 'localstore',
      methodName: 'getItemsKey',
      param: {}
    });
  }
};
export default localstore;