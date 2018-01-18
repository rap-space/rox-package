const fs = require('fs');
const path = require('path');
const getIn = require('lodash.get');
const urllib = require('urllib');

/**
 * @see http://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=8788
 */
const PROJECT_ID = 8788;
const ICONFONT_OPENAPI_URL = `http://www.iconfont.cn/open/project/detail.json?pid=${PROJECT_ID}`;

urllib.request(ICONFONT_OPENAPI_URL, {
  dataType: 'json'
}).then((res) => {
  if (res.status === 200) {
    const data = res.data;
    const fontName = 'RoxIcons';
    const url = getIn(data, 'data.font.ttf_file', '');
    const codes = getIn(data, 'data.icons', []).reduce((ret, iconInfo) => {
      ret[iconInfo.name] = `${String.fromCharCode(Number(iconInfo.unicode))}`;
      return ret;
    }, {});
    const iconCodes = {
      fontName, url, codes
    };

    fs.writeFileSync(path.join(__dirname, '../packages/rox-icon/src/view/code.js'), `export default { default: ${JSON.stringify(iconCodes, null, 2)} };`);
  } else {
    console.error(`请求 iconfont openapi 失败 ${res.status}`);
  }
});
