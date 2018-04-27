import { createElement, render, Component } from 'rax';
// eslint-disable-next-line
import Button from 'rox-button';
import Snackbar from 'rox-snackbar';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from '../rox-example-componet/rox-example-page';
// eslint-disable-next-line
import View from 'rox-view';
import Image from 'rox-image';
import RoxStyleProvider from 'rox-theme-provider';


let App = class NukeDemoIndex extends Component {
  state = {
    showSnackBar: false,
    showSnackBar1: false
  }
  constructor() {
    super();
    this.closeHandler = this.closeHandler.bind(this);
    this.showBar = this.showBar.bind(this);
    this.showBar1 = this.showBar1.bind(this);
  }

  showBar() {
    this.setState({
      showSnackBar: true
    });
  }

  showBar1() {
    this.setState({
      showSnackBar1: true
    });
  }

  closeHandler() {
    this.setState({
      showSnackBar: false
    });
  }

  hideBar() {
  }

  render() {
    let actionTpl = <Image src="https://gw.alicdn.com/tfs/TB150aEkyqAXuNjy1XdXXaYcVXa-18-18.png" style={{
      width: 18,
      height: 18
    }} />;
    return (
      <RoxStyleProvider>
        <Page title="Snackbar">
          <Page.Intro main={'有交互'} />
          <Button style={styles.btn} onPress={this.showBar} type="primary">click me</Button>
          <Snackbar
            message={'测试提示文本'}
            actionTpl={actionTpl}
            visibile={this.state.showSnackBar}
            onAction={() => {
              this.closeHandler();
            }} />
          <Page.Intro main={'无交互'} />
          <Button style={styles.btn} onPress={this.showBar1} type="primary">click me</Button>
          <Snackbar
            message={'测试提示文本'}
            visibile={this.state.showSnackBar1} />
        </Page>
      </RoxStyleProvider>
    );
  }
};

const styles = {
  btnWithMargin: {
    flexDirection: 'row',
    marginTop: 30,
    minHeight: 100,
    marginBottom: 50,
    marginLeft: 42,
    marginRight: 42
  },
  btn: {
    width: 666,
    marginLeft: 42
  }
};
render(<App />);
