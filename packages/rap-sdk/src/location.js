const isWeex = typeof callNative === 'function';
const Location = Object.create(window.location);

Object.defineProperty(Location, 'href', {
  get() {
    if (isWeex) {
      // android is shit!
      return location._url || location.href;
    } else {
      return location.href;
    }
  }
});

export default Location;
