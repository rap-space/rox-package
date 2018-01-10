import { createElement, Component, render } from 'rax';
import Dialog from 'nuke-dialog';
import Button from 'nuke-button';
import View from 'nuke-view';
import Text from 'nuke-text';
import ScrollView from 'nuke-scroll-view';

class Alert extends Component {
  render() {
    return <Text />;
  }
}

class Confirm extends Component {

  hideModal() {
    this.refs.confirm.hide();
  }

  hideModalAndConfirm() {
    this.refs.confirm.hide();
  }

  show() {
    this.refs.confirm.show();
  }

  render() {
    let { okText, cancelText, titleText, onShow, onHide } = this.props;
    titleText = titleText || '温馨提示';
    cancelText = cancelText || '取消';
    okText = okText || '确认';
    onShow = onShow || function() {};
    onHide = onHide || function() {};
    return (
      <Dialog ref="confirm"
        duration={1000}
        maskClosable={false}
        contentStyle={styles.modalStyle}
        onShow={this.onShow}
        onHide={this.onHide}
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
          }]} type="normal" size="large" onPress={this.hideModal}>{cancelText}</Button>
          <Button style={[styles.dlgBtn, {
            borderRadius: 0,
            color: '#ffffff',
            borderBottomRightRadius: 5,
          }]} type="primary" size="large" onPress={this.hideModalAndConfirm}>{okText}</Button>
        </View>
      </Dialog>);
  }
}

var styles = {
  modalStyle: {
    width: 612,
    height: 322,
    // padding:'10rem',
    borderRadius: 12,
  },
  body: {
    flex: 1,
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 30,
    // justifyContent: 'center',
    borderRadius: '8rem',
    backgroundColor: '#ffffff',
  },
  head: {
    height: 50,
    alignItems: 'left',
    justifyContent: 'center',
  },

  textHead: {
    color: '#333333',
    fontSize: 36,
  },
  tips: {
    paddingTop: 12,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 28,
    lines: 3,
    '-webkit-line-clamp': 3,
    overflow: 'hidden',
    lineHeight: '40rem',
    color: '#60646e',
    textAlign: 'center',
    textOverflow: 'ellipsis'
  },
  footer: {
    borderTopColor: '#dddddd',
    flexDirection: 'row',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '94rem'
  },
  dlgBtn: {
    flex: 1,
    borderWidth: 0
  },
  dlgBtnSeperator: {
    color: '#dddddd'
  },
  button: {
    width: '300rem',
    height: '60rem',
    borderWidth: '1rem',
    borderStyle: 'solid',
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
Dialog.Confirm = Confirm;
export default Dialog;