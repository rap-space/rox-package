import localstore from './../localstore';

// localstore.getItem('_rapDebugMode_');

const log = {
  log: function() {
    console.log();
  },
  error: function() {
    console.error();
  },
  debug: function() {
    console.debug();
  },
  warn: function() {
    console.warn();
  },
  info: function() {
    console.info();
  }
};

export default log;