export function getIn(obj, xpath = '') {
  function iterator(obj, path, handler) {
    if (obj == null) return handler(obj);

    if (!Array.isArray(path) || path.length <= 0) {
      return handler(obj);
    }

    const key = path[0];
    const sub = obj[key];

    if (sub == null) {
      return handler(obj);
    }

    return iterator(sub, path.slice(1), handler);
  }

  return iterator(obj, xpath.split('.'), i => i);
}

export function setIn(obj, xpath, value) {
  function iterator(obj, path, value) {
    if (obj == null || !Array.isArray(path) || path.length < 1) return;

    const key = path[0];

    if (path.length === 1) {
      obj[key] = value;

      return;
    }

    const sub = obj[key];

    if (sub == null) {
      obj[key] = {};
    }

    return iterator(obj[key], path.slice(1), value);
  }
}
