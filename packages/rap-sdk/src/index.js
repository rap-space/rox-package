import { isWeex, isWeb } from './env';
import Rap from './rap';
// event
import { on, off, emit } from './event';

// navigator
import navigator from './navigator';

import localStorage from './localstorage';

// biz
import device from './device';
import user from './user';
import share from './biz/share';
import aliwangwang from './biz/aliwangwang';
// request
import aop from './aop';

// UI
import Toast from 'universal-toast';
import { showLoading, hideLoading } from './loading';

// system
import clipboard from './clipboard';
import app from './app';
import util from './util';

// plugin manage
import plugin from './biz/plugin-manage';

// location
import location from './location';

// 这里要设计 保护，不被外部 误干扰

const RAP = {
  app: app,
  env: {
    isWeex, isWeb
  },
  plugin,
  // Event
  on,
  off,
  emit,
  navigator,
  localStorage,
  user,
  fetch,
  aop,
  location,
  share,
  device,
  toast: Toast,
  aliwangwang,
  showLoading,
  hideLoading,
  clipboard,
  util
};

RAP.invoke = Rap.call;

export default RAP;
