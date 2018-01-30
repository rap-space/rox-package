import { createElement, render, Component } from 'rax';
// import { Theme, ThemeProvider, Button, Text, Dialog, View } from 'rox-components';
import ThemeProvider from 'rox-theme-provider';
import Button from 'rox-button';
import Text from 'rox-text';
import Dialog from 'rox-dialog';
import View from 'rox-view';
import Page from 'nuke-page';


let App = class NukeDemoIndex extends Component {
  state = {
    lines: 1,
    disabledTitle: false,
    title: '温馨提示',
    confirmText: '',
    confirmText1: '确定取消开抢提醒吗？',
    confirmText2: '确定取消开抢提醒吗，取消后您将不能及时获取优惠信息，错过最佳进货时间？',
    confirmText5: '确定取消开抢提醒吗，取消后您将不能及时获取优惠信息，错过最佳进货时间？确定取消开抢提醒吗，取消后您将不能及时获取优惠信息，错过最佳进货时间？',
    alertText: '',
    alertText1: '您将错过最佳进货时间。',
    alertText2: '取消开抢提醒后您将不能及时获取优惠信息，错过最佳进货时间。',
    alertText5: '取消开抢提醒后您将不能及时获取优惠信息，错过最佳进货时间, 取消开抢提醒后您将不能及时获取优惠信息，错过最佳进货时间。取消开抢提醒后您将不能及时获取优惠信息，错过最佳进货时间。',
  }

  constructor() {
    super();
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    console.log('showModal');
    this.refs.modal1.hide();
    this.refs.modal1.show();
  }
  hideModal() {
    // alert(10);
    console.log('hideModal');
    this.refs.modal1.hide();
  }
  hideModalAndConfirm() {
    console.log('hideModalAndConfirm');
    this.refs.modal1.hide();
  }
  onShow() {
    console.log('modal show');
  }

  onHide() {
    console.log('modal hide');
  }

  onMaskPress() {
    console.log('onMaskPress');
    this.refs.modal1.hide();
  }

  showConfirm(obj) {
    console.log('showConfirm');
    this.setState({
      disabledTitle: !obj.title,
      lines: obj.lines,
      confirmText: this.state['confirmText' + obj.lines]
    });
    this.refs.confirm.show();
  }

  hideConfirm() {
    console.log('hideConfirm');
    // this.refs.confirm.hide();
  }
  showAlert(obj) {
    console.log('showAlert');
    this.setState({
      disabledTitle: !obj.title,
      lines: obj.lines,
      alertText: this.state['alertText' + obj.lines]
    });
    this.refs.alert.show();
  }
  render() {
    let height = 72;
    if (this.state.lines > 2) {
      height = 72 * 3;
    }
    return (
      <ThemeProvider>
        <Page title="Dialog">
          <Page.Intro main="Dialog" />
          <View style={{ height: '2000rem' }}>

            <Page.Intro main="Dialog.Confirm: 有标题" />
            <Button type="primary" style={styles.margin} onPress={() => {
              this.showConfirm({
                title: true,
                lines: 1
              });
            }}>1行正文</Button>

            <Button type="primary" style={styles.margin} onPress={() => {
              this.showConfirm({
                title: true,
                lines: 2
              });
            }}>2行正文</Button>

            <Button type="primary" style={styles.margin} onPress={() => {
              this.showConfirm({
                title: true,
                lines: 5
              });
            }}>多行正文</Button>


            <Page.Intro main="Dialog.Confirm: 无标题" />
            <Button type="primary" style={styles.margin} onPress={() => {
              this.showConfirm({
                title: false,
                lines: 1
              });
            }}>1行正文</Button>

            <Button type="primary" style={styles.margin} onPress={() => {
              this.showConfirm({
                title: false,
                lines: 2
              });
            }}>2行正文</Button>

            <Button type="primary" style={styles.margin} onPress={() => {
              this.showConfirm({
                title: false,
                lines: 5
              });
            }}>多行正文</Button>

            <Page.Intro main="Dialog.Alert: 有标题" />
            <Button type="primary" style={styles.margin} onPress={() => {
              this.showAlert({
                title: true,
                lines: 1
              });
            }}>标题+1行正文</Button>

            <Button type="primary" style={styles.margin} onPress={() => {
              this.showAlert({
                title: true,
                lines: 2
              });
            }}>标题+2行正文</Button>

            <Button type="primary" style={styles.margin} onPress={() => {
              this.showAlert({
                title: true,
                lines: 5
              });
            }}>标题+多行正文</Button>


            <Page.Intro main="Dialog.Alert: 无标题" />

            <Button type="primary" style={styles.margin} onPress={() => {
              this.showAlert({
                title: false,
                lines: 1
              });
            }}>1行正文</Button>

            <Button type="primary" style={styles.margin} onPress={() => {
              this.showAlert({
                title: false,
                lines: 2
              });
            }}>2行正文</Button>

            <Button type="primary" style={styles.margin} onPress={() => {
              this.showAlert({
                title: false,
                lines: 5
              });
            }}>多行正文</Button>
          </View>

          <Dialog.Alert ref="alert"
            okText={'按钮'}
            disabledTitle={this.state.disabledTitle}
            contentStyle={
              {
                height: height
              }
            }
          >{this.state.alertText}</Dialog.Alert>

          <Dialog.Confirm ref="confirm"
            disabledTitle={this.state.disabledTitle}
            contentStyle={
              {
                height: height
              }
            }
            okText={'按钮'} >{this.state.confirmText}</Dialog.Confirm>
        </Page>
      </ThemeProvider>
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
  margin: {
    marginBottom: 10
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
