import { call } from './rap';

const CLASS_NAME = 'AliAlbum';

const album = {
  photoPicker(param, notify) {
    param.timeout = 6e5;
    return new Promise((resolve, reject) => {
      call({
        className: CLASS_NAME,
        methodName: 'photoPicker',
        param: param,
      }, notify).then(resolve).catch(reject);
    });
  },
  uploadPhoto(param, notify) {
    param.timeout = 6e5;
    return new Promise((resolve, reject) => {
      call({
        className: CLASS_NAME,
        methodName: 'uploadPhoto',
        param: param,
      }, notify).then(resolve).catch(reject);
    });
  },
  savePhotos(param, notify) {
    param.timeout = 1e4;
    return new Promise((resolve, reject) => {
      call({
        className: CLASS_NAME,
        methodName: 'savePhotos',
        param: param,
      }, notify).then(resolve).catch(reject);
    });
  },
};

export default album;
