import localstore from './localstorage';

// localstore.getItem('_rapDebugMode_');
const log = {
  log() {
    console.log();
  },
  error() {
    console.error();
  },
  debug() {
    console.debug();
  },
  warn() {
    console.warn();
  },
  info() {
    console.info();
  }
};

export default log;
