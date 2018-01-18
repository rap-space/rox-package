import RapBridge from './rap';

const CLASS_NAME = 'LocalStorage';
let localstore = {
  getItem(key) {
    return RapBridge.invoke({
      className: CLASS_NAME,
      methodName: 'get',
      param: {
        key: key
      }
    });
  },
  setItem(key) {
    if (!key) {
      console.error('must pass key');
    }
    return RapBridge.invoke({
      className: CLASS_NAME,
      methodName: 'set',
      param: key
    });
  },
  removeItem(key) {
    if (!key) {
      console.error('must pass key');
    }
    return RapBridge.invoke({
      className: CLASS_NAME,
      methodName: 'remove',
      param: {
        key: key
      }
    });
  },
  getKeys() {
    return RapBridge.invoke({
      className: CLASS_NAME,
      methodName: 'getKeys',
      param: {}
    });
  }
};
export default localstore;