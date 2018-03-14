import { isWeb } from 'universal-env';
import getIn from 'lodash.get';

const noop = () => {};

export default function(pageData = {}) {
  const title = getIn('metaData.title', '');

  if (isWeb) {
    document.title = title;
  } else {
    let navigator = __weex_require__('@weex-module/navigator');
    if (navigator.setNavBarTitle) {
      navigator.setNavBarTitle({ title }, noop);
    }
  }
}
