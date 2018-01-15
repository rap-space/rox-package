
/**
 * v1 > v2 return 1
 * v1 = v2 return 0
 * v1 < v2 return -1
 * @param  {String} v1
 * @param  {String} v2
 * @return {Number}
 */
function compare(v1, v2) {
  let v1Arr, v2Arr;
  try {
    v1Arr = v1.toString().split('.');
    v2Arr = v2.toString().split('.');
  } catch (ex) {
    throw('version argument is required and must be string or number');
  }
  let len = Math.max(v1Arr.length, v2Arr.length);
  for (let i = 0; i < len; i++) {
    v1Arr[i] = parseInt(v1Arr[i]) || 0;
    v2Arr[i] = parseInt(v2Arr[i]) || 0;
    if (v1Arr[i] === v2Arr[i] && i + 1 === len) {
      return 0;
    }
    if (v1Arr[i] === v2Arr[i]) {
      continue;
    }
    if (v1Arr[i] > v2Arr[i]) {
      return 1;
    }
    return -1;
  }
}

class Version {
  constructor(v) {
    this.value = v;
  }

  eq(v) {
    return compare(this.value, v) === 0;
  }

  gt(v) {
    return compare(this.value, v) > 0;
  }

  gte(v) {
    return compare(this.value, v) >= 0;
  }

  lt(v) {
    return compare(this.value, v) < 0;
  }

  lte(v) {
    return compare(this.value, v) <= 0;
  }
}

export default Version;
