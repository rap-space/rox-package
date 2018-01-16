import { isWeex, isWeb } from './env';
import Rap from './rap';
// event
import { on, off, emit } from './event';

// navigator
import navigator from './navigator';
import localstore from './localstore';

// biz
import device from './device';
import user from './user';

// request
import mtop from './mtop';
import aop from './aop';

// UI
import Toast from 'universal-toast';
import { showLoading, hideLoading } from './loading';

// system
import clipboard from './clipboard';
import app from './app';
import util from './util';

// 这里要设计 保护，不被外部 误干扰

const RAP = {
  app: app,
  env: {
    isWeex, isWeb
  },
  // Event
  on,
  off,
  emit,

  navigator,
  localstore,

  user,

  fetch,
  mtop,
  aop,

  device,
  toast: Toast,
  showLoading,
  hideLoading,
  clipboard,
  util
};

RAP.invoke = Rap.call;

export default RAP;
