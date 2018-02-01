/** @jsx createElement */
import { createElement, Component, findDOMNode, render } from 'rax';
import RoxStyleProvider from 'rox-theme-provider';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';
import Text from 'rox-text';
import Button from 'rox-button';
import Loading from 'rox-loading';

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
    this.refs.loading.show();
  }
  onVisibleChanged = e => {};
  hideMask(e) {
    this.refs.loading.hide();
  }
  onShow(e) {
    console.log('onshow');
    this.refs.loading.show();
  }
  onHide(e) {
    console.log('onhide');
  }
  render() {
    return (
      <RoxStyleProvider>
        <Page title="Loading">
          <Page.Intro main={'普通用法'} />
          <Button type="primary" onPress={e => this.onShow(e)}>
            显示Loading
          </Button>
          <Loading ref="loading" />
          <View style={styles.other}>
            <Text>1212</Text>
          </View>
          <View style={styles.other2}>
            <Text>1212</Text>
          </View>
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

  other: {
    width: 750,
    marginTop: 20,
    backgroundColor: '#ff0000',
    height: 500
  },
  other2: {
    position: 'fixed',
    width: 750,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,0,0.9)',
    height: 500,
    top: 400,
    left: 0
  },
  text: {
    marginBottom: 20,
    fontSize: 32
  }
};

render(<App />);
