import { isWeex, isWeb } from '../env';
import RapWeex from './index.weex';
import RapWeb from './index.web';

let Rap;

if (isWeex) {
  Rap = RapWeex;
} else if (isWeb) {
  Rap = RapWeex;
}

export default Rap;
