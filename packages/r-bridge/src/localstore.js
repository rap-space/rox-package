import RapBridge from './rap';
const CLASS_NAME = 'localstore';
let localstore = {
  getItem(key) {
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'get',
      param: {
        key: key
      }
    });
  },
  setItem(key) {
    if (!key) {
      console.error('must pass key')
    }
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'set',
      param: {
        key: key
      }
    });
  },
  removeItem(key) {
    if (!key) {
      console.error('must pass key')
    }
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'remove',
      param: {
        key: key
      }
    });
  },
  getKeys() {
    return RapBridge.call({
      className: CLASS_NAME,
      methodName: 'getKeys',
      param: {}
    });
  }
};
export default localstore;