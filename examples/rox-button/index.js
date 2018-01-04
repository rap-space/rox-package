import { createElement, render, Component } from 'rax';
// eslint-disable-next-line
import { StyleProvider } from 'nuke-theme-provider';
import Button from 'rox-button';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';

console.log(Theme);

let App = class NukeDemoIndex extends Component {
  render() {
    return (
      <StyleProvider
        style={Theme}
        androidConfigs={{ materialDesign: false }}
      >
        <Page title="Button">
          <Page.Intro main="primary" />
          <View style={styles.btnWithMargin} >
            <Button block type="primary" onPress={this.press}>primary</Button>
          </View>
          <Page.Intro main="secondary" />
          <View style={styles.btnWithMargin}>
            <Button block type="secondary">secondary</Button>
          </View>
          <Page.Intro main="normal" />
          <View style={styles.btnWithMargin}>
            <Button block type="normal">normal</Button>
          </View>
          <Page.Intro main="warning" />
          <View style={styles.btnWithMargin}>
            <Button block type="primary" shape="warning">primary</Button>
          </View>
          <Page.Intro sub="size" />
          <View style={styles.btnWithMargin} >
            <Button style={styles.btn} type="primary" size="large" onPress={this.press}>primary</Button>
            <Button style={styles.btn} type="primary" onPress={this.press}>primary</Button>
            <Button style={styles.btn} type="primary" size="small" onPress={this.press}>primary</Button>
          </View>
        </Page>
      </StyleProvider>
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
    marginBottom: 20,
    marginRight: 20
  }
};
render(<App />);
