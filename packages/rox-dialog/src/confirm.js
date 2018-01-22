import { createElement, Component, render } from 'rax';
import Dialog from 'nuke-dialog';
import Button from 'rox-button';
import ScrollView from 'rox-scrollview';
import View from 'rox-view';
import Text from 'rox-text';

import styles from './styles';

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
        duration={1000}
        maskClosable={false}
        contentStyle={styles.modalStyle}
      >
        <View style={styles.body}>
          <View style={styles.head}>
            <Text style={styles.textHead}>{titleText}</Text>
          </View>
          <ScrollView style={styles.tips}>
            <Text style={styles.text}>
              {this.props.children}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Button style={[styles.dlgBtn, {
            borderRadius: 0,
            color: '#333333',
            borderTopWidth: 1,
            borderBottomLeftRadius: 5,
          }]} type="normal" size="large" onPress={() => {
            this.hide('cancel');
          }}>{cancelText}</Button>
          <Button style={[styles.dlgBtn, {
            borderRadius: 0,
            color: '#ffffff',
            borderBottomRightRadius: 5,
          }]} type="primary" size="large" onPress={() => {
            this.hide('ok');
          }}>{okText}</Button>
        </View>
      </Dialog>);
  }
}

export default Confirm;