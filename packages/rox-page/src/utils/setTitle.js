import { isWeb } from 'universal-env';

const noop = () => {};

export default function(title) {
  if (isWeb) {
    document.title = title;
  } else {
    let navigator = __weex_require__('@weex-module/navigator');
    if (navigator.setNavBarTitle) {
      navigator.setNavBarTitle({ title }, noop);
    }
  }
}
