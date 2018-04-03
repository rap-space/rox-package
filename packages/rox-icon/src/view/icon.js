/** @jsx createElement */

'use strict';

import { Component, createElement, PropTypes } from 'rax';
import Text from 'nuke-text';
import Touchable from 'nuke-touchable';
import Image from 'nuke-image';
import configIconfont from 'nuke-iconfont';
import { connectStyle } from 'nuke-theme-provider';

import stylesProvider from '../styles';
import code from './code';

let iconConfigs = code;

export function setIconConfig(config) {
  iconConfigs = config;
}

class Icon extends Component {
  componentDidMount() {
    const type = this.getType();
    if (type === 'iconfont') {
      const { version } = this.props;
      const fontURL = iconConfigs[version].url;
      const fontName = iconConfigs[version].fontName;

      configIconfont({ name: fontName, url: fontURL });
    }
  }
  /**
  * 对 type 新增字段做矫正
  */
  getType() {
    const { name = '' } = this.props;
    let { type = 'image' } = this.props;
    if (type === 'image' && name !== '') {
      type = 'iconfont';
    }
    return type;
  }

  render() {
    const {
      size,
      name = '',
      style,
      version,
      onPress,
      fixedFont,
      ...others
    } = this.props;
    const iconConfig = iconConfigs[version];
    const styles = this.props.themeStyle;

    const type = this.getType();
    if (type === 'iconfont') {
      const textStyle = Object.assign({}, styles[`iconfont-${size}`], style, {
        fontFamily: iconConfig.fontName
      });

      return (
        <Text onClick={onPress} {...others} fixedFont={fixedFont} style={textStyle}>
          {iconConfig.codes[name]}
        </Text>
      );
    }
    const wrapStyle = Object.assign({}, styles['icon-image'], style);
    const sizeStyle = styles[`image-${size}`];
    return (
      <Touchable onPress={onPress} style={wrapStyle} {...others}>
        <Image
          source={{ uri: this.props.src }}
          style={sizeStyle}
          resizeMode={'cover'}
        />
      </Touchable>
    );
  }
}
Icon.displayName = 'Icon';

Icon.defaultProps = {
  size: 'medium',
  style: {},
  name: '',
  onPress: () => { },
  src: '',
  type: 'image',
  version: 'default',
  fixedFont: false,
};
Icon.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.any,
  style: PropTypes.any,
  src: PropTypes.string,
  type: PropTypes.string,
  version: PropTypes.oneOf(['default', 'v2']),
  size: PropTypes.oneOf(['xs', 'small', 'medium', 'large']),
  fixedFont: PropTypes.boolean,
};

Icon.contextTypes = {
  parentPath: PropTypes.any,
  parentStyle: PropTypes.any
};
const StyledIcon = connectStyle(stylesProvider)(Icon);

export default StyledIcon;
