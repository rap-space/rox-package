import { isWeex } from '../env';
import { requireModule } from '../rap/weex-module';
import wpo from './src/log';

export default {
  setConfig(spm = []) {
    const retcodeConfig = {
      // 抽样分母，1代表100%上报，10代表10%上报，100代表1%上报
      sample: 1,
      // spmId必须设置,如果没写默认值,会自动抓页面的spm
      spmId: spm.join('.')
    };

    if (isWeex) {
      retcodeConfig.user = requireModule('@weex-module/user');
      retcodeConfig.request = requireModule('@weex-module/stream').fetch;
    }

    wpo.setConfig(retcodeConfig);
  },
  traceAopApi(namespace, api, version, issuccess, delay, msg, detail) {
    wpo.retCode({
      api: `${namespace}.${api}@${version}`,
      issuccess,
      delay,
      msg,
      detail
    });
  },
  traceProxyApi(url, issuccess, delay, msg, detail) {
    const api = url.split('?')[0];
    wpo.retCode({
      api,
      issuccess,
      delay,
      msg,
      detail
    });
  }
};
