import { createElement, Component, render, PropTypes } from 'rax';
import Dialog from 'nuke-dialog';
import Button from 'rox-button';
import ScrollView from 'rox-scrollview';
import View from 'rox-view';
import Text from 'rox-text';

import styles from './styles';

const DURATION_TIME = 1000;
const BORDER_RADIUS = 12;
class Alert extends Component {
  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }
  hide() {
    this.refs.alert.hide();
  }

  show() {
    this.refs.alert.show();
  }

  render() {
    let { okText, titleText, disabledTitle, contentStyle = {}} = this.props;
    // onHide = onHide || this.hide;
    contentStyle = disabledTitle ? {
      marginTop: 0,
      minHeight: 332 - 96 * 2
    } : contentStyle;
    return (
      <Dialog ref="alert"
        duration={DURATION_TIME}
        maskClosable={false}
        contentStyle={styles.modalStyle}
      >
        <View style={styles.body}>
          {
            disabledTitle ? null : <View style={styles.head}>
              <Text style={styles.textHead}>{titleText}</Text>
            </View>
          }
          <View style={[styles.content, contentStyle]}>
            <Text style={styles.contentText}>
              {this.props.children}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button style={styles.buttonAlert} type="normal" size="large" onPress={this.hide}>{okText}</Button>
        </View>
      </Dialog>);
  }
}
Alert.displayName = 'Alert';

Alert.defaultProps = {
  okText: '确认',
  titleText: '温馨提示',
  disabledTitle: false
};
Alert.propTypes = {
  okText: PropTypes.string,
  titleText: PropTypes.string,
  disabledTitle: PropTypes.boolean
};
export default Alert;