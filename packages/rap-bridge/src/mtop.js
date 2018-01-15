// 需要考虑三种场景
// 1. Weex环境下
// 2. weex 降级的 主客容器下
// 3. H5下
import { requireModule } from './rap/weex-module';
import { isWeex, isWeb} from './env';

let mtop;
function mtop(params) {
  // return Windvane.call();
  if (isWeex) {
    mtop = requireModule('windvane');
  } else if (isWeb) {
    mtop = {};
  }
}
export default mtop;