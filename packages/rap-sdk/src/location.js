const isWeex = typeof callNative === 'function';

const Location = {
  ...window.location,
  get href() {
    const hasBundleUrl = isWeex && window.__weex_options__ && window.__weex_options__.bundleUrl;

    if (hasBundleUrl) {
      return __weex_options__.bundleUrl;
    } else {
      return location.href;
    }
  }
};

export default Location;
