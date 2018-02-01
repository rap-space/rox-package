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
  }

  show() {
    this.refs.myMask.show();
    setTimeout(() => {
      this.refs.myMask.hide();
    }, 3000);
  }
  onShow(e) {
    console.log('onshow');
  }
  onHide(e) {
    console.log('onhide');
  }
  onVisibleChanged() {

  }

  render() {
    return (
      <Mask
        defaultVisible={false}
        onVisibleChanged={this.onVisibleChanged}
        ref="myMask"
        animate={false}
        style={styles.mask}
        maskClosable={true}
      >
        <View style={styles.loading}>
          <Image source={{
            uri: 'https://img.alicdn.com/tfs/TB16UqKj8fH8KJjy1XbXXbLdXXa-74-74.gif'
          }} style={styles.loadingIcon} />
          <Text style={styles.loadingText}>加载中</Text>
        </View>
      </Mask>
    );
  }
}
export default Loading;