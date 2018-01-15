
import RapBridge from './rap';
const CLASS_NAME = 'device';
let device = getDeviceMsg();
function getDeviceMsg() {
  let device = {
    type: undefined, // 类型
    model: undefined, // 名称
    vender: undefined, // 供应商
    ttid: undefined, // 渠道标识
    utdid: undefined, // 设备标识

    getInfo(options = {}) {
      // 这里可能是同步调用；
      return RapBridge.call({
        className: CLASS_NAME,
        methodName: 'getInfo'
      });
    },
  };
  return device;
}
export default device;
