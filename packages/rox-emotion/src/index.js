/** @jsx createElement */

'use strict';

import { createElement, Component, findDOMNode, PropTypes } from 'rax';
import View from 'rox-view';
import Env from 'universal-env';
import Image from 'rox-image';
import Text from 'rox-text';
import Link from 'rox-link';

const { isWeex, isWeb } = Env;
// NOT_FOUND
// ORDER
// COMMENT
// COLLECT
// commonEmpty
const ICON_LIST = {
  '404': '//gw.alicdn.com/tfs/TB1QFn9mS_I8KJjy0FoXXaFnVXa-340-340.png',
  'order': '//gw.alicdn.com/tfs/TB1O6jnmRfH8KJjy1XbXXbLdXXa-340-340.png',
  'redpack': '//gw.alicdn.com/tfs/TB1Vg.TmLDH8KJjy1XcXXcpdXXa-340-340.png',
  'purchaselist': '//gw.alicdn.com/tfs/TB1NjrnmRfH8KJjy1XbXXbLdXXa-340-340.png',
  'comment': '//gw.alicdn.com/tfs/TB1lxkTmLDH8KJjy1XcXXcpdXXa-340-340.png',
  'collect': '//gw.alicdn.com/tfs/TB146znmRfH8KJjy1XbXXbLdXXa-340-340.png',
  'search': '//gw.alicdn.com/tfs/TB1r4sTmLDH8KJjy1XcXXcpdXXa-340-340.png',
  'commonEmpty': '//gw.alicdn.com/tfs/TB1ShJfmY_I8KJjy1XaXXbsxpXa-340-340.png',
  'wangwang': '//gw.alicdn.com/tfs/TB18PLnmRfH8KJjy1XbXXbLdXXa-340-340.png',
  'connectError': '//gw.alicdn.com/tfs/TB1NhRfmY_I8KJjy1XaXXbsxpXa-340-340.png',
  'orderInvalid': '//img.alicdn.com/tfs/TB1RznnbWmWBuNjy1XaXXXCbXXa-340-340.png',
  'authInvalid': '//gw.alicdn.com/tfs/TB1ukm5bYGYBuNjy0FoXXciBFXa-340-340.png',
  'noNetwork': '//gw.alicdn.com/tfs/TB1VzTnmRfH8KJjy1XbXXbLdXXa-340-340.png',
  'coupon': '//gw.alicdn.com/tfs/TB1lN0fmY_I8KJjy1XaXXbsxpXa-340-340.png',
  'paySuccess': '//gw.alicdn.com/tfs/TB1Gh8fmY_I8KJjy1XaXXbsxpXa-340-340.png',
  'payProcessing': '//gw.alicdn.com/tfs/TB12gUxmNrI8KJjy0FpXXb5hVXa-340-340.png'
};
const ICON_SIZE = 340;

class Emotion extends Component {
  constructor(props) {
    super(props);
  }

  onPress() {
    this.props.onPress && this.props.onPress();
  }

  render() {
    let { type, style, width, height, text, buttonText, buttonLink, children } = this.props;
    type = type || '404';
    let stylesContainer = {
      ...styles.container
    };
    if (style || width || height) {
      if (style.width || width) {
        stylesContainer.width = parseInt(width || style.width);
      }
      if (style.height || height) {
        stylesContainer.height = parseInt(height || style.height);
      }
    }

    let iconStyle = {
      width: ICON_SIZE,
      height: ICON_SIZE
    };
    return (
      <View style={stylesContainer}>
        <Image src={ICON_LIST[type]} style={iconStyle} />
        { text ? <Text style={styles.emotionText}>{text}</Text> : null }
        { buttonText ? <Link style={styles.button} href={buttonLink}><Text style={styles.buttonText}>{buttonText}</Text></Link> : null}
        { children }
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#FBFBFB',
    width: 750,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emotionText: {
    color: '#9FABB9',
    fontSize: 28,
    marginTop: 24
  },
  button: {
    width: 300,
    height: 80,
    backgroundColor: '#FF6000',
    fontSize: 30,
    borderRadius: 100,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 15px 15px rgba(255, 70, 0, 0.3)'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 30
  }
};
Emotion.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
};

Emotion.defaultProps = {
  style: {}
};

Emotion.displayName = 'Emotion';

export default Emotion;
