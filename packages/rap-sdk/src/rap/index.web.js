import { requireModule } from './weex-module';

const call = function(params) {
  if (window.WindVane && window.WindVane.call) {
    // noop
  } else {
    console.warn('非法环境调用、请使用 【阿里巴巴-客户端】 扫码测试');
  }
};

export default {
  call,
  invoke: call,
  requireModule
};
