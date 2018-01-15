import Rap from './rap';
import { on, off, emit } from './event';
import navigator from './navigator';

import localstore from './localstore';
import device from './device';

import user from './user';
import mtop from './mtop';

import aop from './aop';
import Toast from 'universal-toast';
import { showLoading, hideLoading } from './loading';

import { isWeex, isWeb } from './env';
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
  util
};

RAP.app.invoke = Rap.call;

 
export default RAP;
