import { on, off, emit } from './event';
import navigator from './navigator';
import toast from './toast';
import device from './device';
import localstore from './localstore';

import user from './user';
import mtop from './mtop';
import aop from './aop';

const Rox = {

  // Event
  on,
  off,
  emit,

  navigator,
  localstore,

  user,
  mtop,

  device,
  toast,
  aop
};

export default Rox;
