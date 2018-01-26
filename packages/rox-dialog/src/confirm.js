import { createElement, Component, render } from 'rax';
import Dialog from 'nuke-dialog';
import Button from 'rox-button';
import ScrollView from 'rox-scrollview';
import View from 'rox-view';
import Text from 'rox-text';

import styles from './styles';

const DURATION_TIME = 1000;
const BORDER_RADIUS = 12;
class Confirm extends Component {
  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  hide(type) {
    let { onOk, onCancel} = this.props;
    if (type == 'ok' &&　onOk) {
      onOk();
      this.refs.confirm.hide();
    } else if (type == 'cancel' && onCancel) {
      onCancel();
      this.refs.confirm.hide();
    }
    this.refs.confirm.hide();
  }

  show() {
    this.refs.confirm.show();
  }

  render() {
    let { okText, cancelText, titleText } = this.props;
    titleText = titleText || '温馨提示';
    cancelText = cancelText || '取消';
    okText = okText || '确认';
    return (
      <Dialog ref="confirm"
        duration={DURATION_TIME}
        maskClosable={false}
        contentStyle={styles.modalStyle}
      >
        <View style={styles.body}>
          <View style={styles.head}>
            <Text style={styles.textHead}>{titleText}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>
              {this.props.children}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button style={[styles.buttonConfirm, {
            color: '#333333',
            borderTopWidth: 1,
            borderBottomLeftRadius: BORDER_RADIUS,
          }]} type="normal" size="large" onPress={() => {
            this.hide('cancel');
          }}>{cancelText}</Button>
          <Button style={[styles.buttonConfirm, {
            color: '#ffffff',
            borderRadius: 0,
            borderBottomRightRadius: BORDER_RADIUS,
          }]} type="primary" size="large" onPress={() => {
            this.hide('ok');
          }}>{okText}</Button>
        </View>
      </Dialog>);
  }
}

export default Confirm;