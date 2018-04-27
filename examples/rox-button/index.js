import { createElement, render, Component } from 'rax';
import { Button, Theme, ThemeProvider, View } from 'rox-components';
// import Page from 'nuke-page';
import Page from '../../packages/rox-example-componet/rox-example-page';

let App = class NukeDemoIndex extends Component {
  render() {
    return (
      <ThemeProvider>
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
          <Page.Intro main="size" />
          <View style={styles.btnWithMargin} >
            <Button style={styles.btn} type="primary" size="large" onPress={this.press}>primary</Button>
            <Button style={styles.btn} type="primary" onPress={this.press}>primary</Button>
            <Button style={styles.btn} type="primary" size="small" onPress={this.press}>primary</Button>
          </View>
          <Page.Intro main={'独占一行'} />
          <View style={Object.assign({}, styles.btnWithMargin, { flexDirection: 'column' })} >
            <Button style={styles.btn} block type="primary" size="large" onPress={this.press}>primary</Button>
          </View>
        </Page>
      </ThemeProvider>
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
