// TODO: 打点相关 spm 数据注入

import spm from '../packages/universal-spm';
import goldlog from '../packages/universal-goldlog';
import { getIn } from './xpath';

export default function(pageData = {}, params) {
  const a = getIn(pageData, 'metaData.spma');
  const b = getIn(pageData, 'metaData.spmb');

  // 设置页面 SPM，ab 位自己申请
  spm.setPageSPM(a, b);
  // 发送请求，这里 params 可以附加各种 k-v 对
  goldlog.launch([a, b], params);
};
