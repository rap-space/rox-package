var _make_rnd = function() {
  return +new Date() + Math.floor(Math.random() * 1000);
};

var spmId = '';

var getSpmId = function() {
  var meta = document.getElementsByTagName('meta'),
    id = [];
  var spma = '';
  if (spmId) {
    return spmId;
  }
  // spm第一位
  for (var i = 0; i < meta.length; i++) {
    var tag = meta[i];
    if (tag && tag.name && (tag.name == 'data-spm' || tag.name == 'spm-id')) {
      spma = tag.content;
    }
  }
  if (spma) {
    id.push(spma);
  }
  // spm第二位
  if (document.body && document.body.getAttribute('data-spm')) {
    id.push(document.body.getAttribute('data-spm'));
  }

  id = id.length ? id.join('.') : 0;

  if (id && id.indexOf('.') !== -1) {
    spmId = id;
  }

  return spmId;
};

if (!getSpmId.bind) {
  getSpmId.bind = function() {
    return getSpmId;
  };
}

module.exports = {
  sendRequest: function(src) {
    var win = window;
    var n = 'jsFeImage_' + _make_rnd(),
      img = win[n] = new Image();
    img.onload = img.onerror = function() {
      win[n] = null;
    };
    img.src = src;
    img = null;
  },

  getCookie: function() {
    return document.cookie;
  },

  getSpmId: getSpmId
};