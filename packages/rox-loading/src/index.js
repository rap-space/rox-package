import { createElement, Component, render } from 'rax';
import Mask from 'rox-mask';
import View from 'rox-view';
import Text from 'rox-text';

// const StyledIcon = connectStyle(stylesProvider)(Icon);
import Image from 'rox-image';
import styles from './styles';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this.refs.loadingMask.show();
    // setTimeout(() => {
    //   this.refs.loadingMask.hide();
    // }, 3000);
  }
  hide() {
    this.refs.loadingMask.hide();
  }
  //
  onVisibleChanged() {
  }

  render() {
    let { text, onVisibleChanged, maskClosable} = this.props;
    let loadingText = text || '努力加载中...';
    return (
      <Mask
        defaultVisible={false}
        onVisibleChanged={(e) => {
          onVisibleChanged && onVisibleChanged(e);
        }}
        ref="loadingMask"
        animate={false}
        style={styles.mask}
        maskClosable={maskClosable}
      >
        <View style={styles.loading}>
          <Image source={{
            uri: 'https://img.alicdn.com/tfs/TB16UqKj8fH8KJjy1XbXXbLdXXa-74-74.gif'
          }} style={styles.loadingIcon} />
          <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
      </Mask>
    );
  }
}
export default Loading;