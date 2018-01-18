import { imageSize, fontSize } from './mixin';

function StyleMix(theme = {}) {
  const core = theme.Core;
  return {
    Icon: {
      'icon-image': {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
      },
      'image-xs': imageSize(core['icon-xs']),
      'image-small': imageSize(core['icon-s']),
      'image-medium': imageSize(core['icon-m']),
      'image-large': imageSize(core['icon-l']),
      'icon-iconfont': {
        fontWeight: 400,
      },
      'iconfont-xs': fontSize(core['icon-xs']),
      'iconfont-small': fontSize(core['icon-s']),
      'iconfont-medium': fontSize(core['icon-m']),
      'iconfont-large': fontSize(core['icon-l']),
    },
  };
}

module.exports = StyleMix;
