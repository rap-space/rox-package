import { isWeex, isWeb } from './env';
import Rap from './rap';
// event
import { on, off, emit } from './event';

// navigator
import navigator from './navigator';

// localstorage
import localStorage from './localstorage';

// biz
import device from './device';
import user from './user';
import share from './biz/share';
import aliwangwang from './biz/aliwangwang';
import { getIdentity } from './biz/identity';
import {getBizInfo, getBizInfoUrl} from './biz/productinfo';
import sso from './biz/sso';
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

// tracelog
import tracelog from './tracelog';

// 这里要设计 保护，不被外部 误干扰

const RAP = {
  app: app,
  env: {
    isWeex, isWeb
  },
  biz: {
    getBizInfo,
    getBizInfoUrl,
    getIdentity
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
  sso,
  util,
  tracelog
};

RAP.invoke = Rap.call;

export default RAP;
