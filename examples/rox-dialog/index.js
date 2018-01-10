import { createElement, render, Component } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Button from 'rox-button';
import Text from 'nuke-text';
import Dialog from 'rox-dialog';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.hideModal = this.hideModal.bind(this);
  }
  showModal = () => {
    this.refs.modal1.show();
  }
  hideModal() {
    // alert(10);
    this.refs.modal1.hide();
  }
  hideModalAndConfirm = () => {
    console.log('confirm');
    this.refs.modal1.hide();
  }
  onShow = () => {
    console.log('modal show');
  }

  onHide = () => {
    console.log('modal hide');
  }
  onMaskPress = () => {
    this.refs.modal1.hide();
  }
  showConfirm = () => {
    this.refs.confirm.show();
  }
  render() {
    return (
      <RoxStyleProvider>
        <Page title="Progress">
          <Page.Intro main="Dialog" />
          <View style={{ height: '2000rem' }}>
            <Button type="primary" onPress={this.showModal}>点击打开对话框，可以点击遮罩层关闭</Button>
            <Text>Confirm</Text>
            <Button type="primary" onPress={() => {
              this.showConfirm();
            }}>点击打开 对话框</Button>
          </View>
          <Dialog.Confirm ref="confirm">  此操作不此操作不</Dialog.Confirm>
          <Dialog ref="modal1" duration={1000} maskClosable={false} contentStyle={styles.modalStyle} onShow={this.onShow} onHide={this.onHide} onMaskPress={this.onMaskPress}>
            <View style={styles.body}>
              <View style={styles.head}>
                <Text style={styles.textHead}>确定吗？</Text>
              </View>
              <View style={styles.tips}>
                <Text style={styles.text}>
                  此操作不此操作不可逆此操作不可逆此操作不
                  可逆此操作不可逆此操作不可逆此操作不可逆此
                  操作不可逆此操作不可逆此操作不可逆可逆
                  是否继续
                </Text>
              </View>
            </View>
            <View style={styles.footer}>
              <Button style={[styles.dlgBtn, {
                borderRadius: 0,
                color: '#333333',
                borderTopWidth: 1,
                borderBottomLeftRadius: 5,
              }]} type="normal" size="large" onPress={this.hideModal}>取消</Button>
              <Button style={[styles.dlgBtn, {
                borderRadius: 0,
                color: '#ffffff',
                borderBottomRightRadius: 5,
              }]} type="primary" size="large" onPress={this.hideModalAndConfirm}>确定</Button>
            </View>
          </Dialog>
        </Page>
      </RoxStyleProvider>
    );
  }
};

var styles = {
  wrapper: {
    paddingLeft: '24rem',
    paddingRight: '24rem',
    paddingTop: '24rem',
    backgroundColor: '#f4f4f4'
  },
  click: {
    height: '100rem',
    lineHeight: '100rem',
    textAlign: 'center',
    borderWidth: '1rem',
    borderStyle: 'solid',
    borderColor: '#ccc'
  },
  modalStyle: {
    width: 750 * 0.8,
    height: '364rem',
    borderTopColor: '#FF6000',
    borderTopStyle: 'solid',
    borderTopWidth: '8rem',
    // padding:'10rem',
    borderRadius: '8rem',
  },
  body: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 30,
    // justifyContent: 'center',
    borderRadius: '8rem',
    backgroundColor: '#ffffff',
  },
  head: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHead: {
    color: '#3d4145',
    fontSize: 32,
  },
  tips: {

  },
  text: {
    fontSize: '28rem',
    lines: 3,
    '-webkit-line-clamp': 3,
    overflow: 'hidden',
    height: '120rem',
    lineHeight: '40rem',
    color: '#60646e',
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
render(<App />);