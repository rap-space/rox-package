/** @jsx createElement */

'use strict';

import { createElement, Component, findDOMNode, PropTypes } from 'rax';
import View from 'nuke-view';
import Env from 'nuke-env';
import Image from 'nuke-image';
import Text from 'nuke-text';
import Button from 'nuke-button';
import Link from 'nuke-link';
import stylesProvider from './styles';

const { isWeex, isWeb } = Env;

const IMG_LIST = {
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
  'noNetwork': '//gw.alicdn.com/tfs/TB1VzTnmRfH8KJjy1XbXXbLdXXa-340-340.png',
  'coupon': '//gw.alicdn.com/tfs/TB1lN0fmY_I8KJjy1XaXXbsxpXa-340-340.png',
  'paySuccess': '//gw.alicdn.com/tfs/TB1Gh8fmY_I8KJjy1XaXXbsxpXa-340-340.png',
  'payProcessing': '//gw.alicdn.com/tfs/TB12gUxmNrI8KJjy0FpXXb5hVXa-340-340.png'
};

class Emotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innerWidth: 0,
    };
  }

  onPress() {
    this.props.onPress && this.props.onPress();
  }

  render() {
    let type = this.props.type || '404';

    if (this.props.height) {
      styles.container.height = +this.props.height;
    }

    return (
      <View style={styles.container}>
        <Image src={IMG_LIST[type]} style={{
          width: 340,
          height: 340
        }} />
        <Text style={styles.feedbackText}>{this.props.feedbackText}</Text>
        {this.props.btnText ? <Button style={styles.feedbackBtn} onPress={() => {
          this.onPress();
        }}>{this.props.btnText}</Button> : null}
        {this.props.jumpText ?
          <Link style={styles.feedbackLink} href={this.props.jumpLink}>
            {this.props.jumpText}
          </Link> : null
        }
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
  feedbackText: {
    color: '#9FABB9',
    fontSize: 28,
    marginTop: 24
  },
  feedbackBtn: {
    width: 300,
    height: 80,
    backgroundColor: '#FF5900',
    fontSize: 30,
    color: '#ffffff',
    borderRadius: 100,
    marginTop: 32
  },
  feedbackLink: {
    color: '#FF3C00',
    fontSize: 30,
    marginTop: 24
  }
};
Emotion.propTypes = {
  rate: PropTypes.number,
  style: PropTypes.any,
  barStyle: PropTypes.any
};

Emotion.defaultProps = {
  rate: 1,
  style: {},
  barStyle: {}
};
Emotion.displayName = 'Emotion';

export default Emotion;
