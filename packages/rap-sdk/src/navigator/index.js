import { isWeex, isWeb } from '../env';
import NavigatorWeex from './index.weex';
import NavigatorWeb from './index.web';

let Navigator;

if (isWeex) {
  Navigator = NavigatorWeex;
} else {
  Navigator = NavigatorWeb;
}

module.exports = Navigator;
