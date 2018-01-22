
import Rap from '../rap';
import WV from '../windvane';

const CLASS_NAME = 'PluginManage';

const pluginManage = {
  updatePluginList(callback) {
    return Rap.invoke({
      className: CLASS_NAME,
      methodName: 'updatePluginList',
      param: {}
    }, callback);
  },
  setPluginsGray(appKeys, callback) {
    if (typeof appKeys === 'string') {
      appKeys = [appKeys];
    }

    return Rap.invoke({
      className: CLASS_NAME,
      methodName: 'setPluginsGray',
      param: {
        appKeys
      }
    }, callback);
  },
  updatePluginListByWV(callback) {
    return WV.call(CLASS_NAME, 'updatePluginList', {}, callback);
  },
  setPluginsGrayByWV(appKeys, callback) {
    if (typeof appKeys === 'string') {
      appKeys = [appKeys];
    }

    return WV.call(CLASS_NAME, 'setPluginsGray', {
      appKeys
    }, callback);
  },
};

export default pluginManage;
