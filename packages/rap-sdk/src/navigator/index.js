import { isWeex, isWeb } from '../env';

let Rap;

if (isWeex) {
  Rap = require('./index.weex');
} else if (isWeb) {
  Rap = require('./index.web');
}

module.exports = Rap;
