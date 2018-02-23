import Location from './location';

// localstore.getItem('_rapDebugMode_');


let href = Location.href;
let regRapDebugMode = /rapDebugMode=(\w+)&?/g;
let result = href.exec(regRapDebugMode);
let debugMode;
if (result && result[1]) {
  debugMode = result[1];
}
const log = {
  log() {
    logger('log', arguments);
  },
  error() {
    logger('error', arguments);
  },
  debug() {
    logger('debug', arguments);
  },
  warn() {
    logger('warn', arguments);
  },
  info() {
    logger('info', arguments);
  }
};

function logger(type, args) {
  if (type == debugMode) {
    let _args = sliceArguments(args);
    console[type].apply(console, _args);
  } else {
  }
}
function sliceArguments(arg) {
  return Array.prototype.slice(arg);
}

export default log;
