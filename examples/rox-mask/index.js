/** @jsx createElement */
import { createElement, Component, findDOMNode, render } from 'rax';
import RoxStyleProvider from 'rox-theme-provider';
// eslint-disable-next-line
import Page from '../rox-example-componet/rox-example-page';
// eslint-disable-next-line
import View from 'nuke-view';
import Text from 'nuke-text';
import Button from 'rox-button';
import Mask from 'rox-mask';

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.state = {
      maskVisible: false
    };
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  showMask(e) {
    console.log('clicked');
    this.refs.myMask.show();
  }
  onVisibleChanged = e => {};
  hideMask(e) {
    this.refs.myMask.hide();
  }
  onShow(e) {
    console.log('onshow');
  }
  onHide(e) {
    console.log('onhide');
  }
  render() {
    return (
      <RoxStyleProvider>
        <Page title="Mask">
          <Page.Intro main={'普通用法'} />
          <Button type="primary" onPress={e => this.showMask(e)}>
            打开浮层
          </Button>

          <Mask
            onShow={this.onShow}
            defaultVisible={false}
            onVisibleChanged={this.onVisibleChanged}
            ref="myMask"
            animate={false}
            style={styles.mask}
            maskClosable={true}
          >
            <View style={styles.dialogWrap}>
              <Text style={styles.text}>点击外层 mask 区域可关闭</Text>
              <Button type="primary" onPress={e => this.hideMask(e)}>
                关闭
              </Button>
            </View>
          </Mask>
        </Page>
      </RoxStyleProvider>
    );
  }
};

const styles = {
  textarea: {
    width: '750rem',
    height: '200rem',
    borderWidth: '1rem',
    borderStyle: 'solid',
    borderColor: '#cccccc'
  },
  mask: {
    flex: 1,

    width: '750rem',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  dialogWrap: {
    width: 600,
    height: 300,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  text: {
    marginBottom: 20,
    fontSize: 32
  }
};

render(<App />);
