
import Rap from '../rap';
import WV from '../windvane';

const CLASS_NAME = 'PluginManage';

const pluginManage = {
  updatePluginList(callback) {
    return Rap.call(CLASS_NAME, 'updatePluginList', {}, callback);
  },
  setPluginsGray(appKeys, callback) {
    if (typeof appKeys === 'string') {
      appKeys = [appKeys];
    }

    return Rap.call(CLASS_NAME, 'setPluginsGray', {
      appKeys
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
