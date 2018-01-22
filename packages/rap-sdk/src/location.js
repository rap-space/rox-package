const isWeex = typeof callNative === 'function';

const Location = Object.create(window.location);

Object.defineProperty(Location, 'href', {
  get() {
    if (isWeex) {
      return location._url;
    } else {
      return location.href;
    }
  }
});

export default Location;
