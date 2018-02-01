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

  // componentWillReceiveProps(nextProps) {
  //   this.show = nextProps.show || false;
  // }
  onShow() {
    this.refs.myMask.show();
  }
  onVisibleChanged() {

  }
  render() {
    return (
      <Mask
        onShow={this.onShow}
        defaultVisible={false}
        onVisibleChanged={this.onVisibleChanged}
        ref="myMask"
        animate={false}
        style={styles.mask}
        maskClosable={false}
      >
        <View style={styles.loading}>
          <Image source={{
            uri: 'https://gw.alicdn.com/tfs/TB1YPErXntYBeNjy1XdXXXXyVXa-68-68.gif'
          }} style={styles.loadingIcon} />
          <Text style={styles.text}>Loading...</Text>
        </View>
      </Mask>
    );
  }
}
export default Loading;