import { createElement, render, Component } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Button from 'rox-button';
import Progress from 'rox-progress';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from '../../packages/rox-example-componet/rox-example-page';
// eslint-disable-next-line
import View from 'nuke-view';

let App = class NukeDemoIndex extends Component {
  render() {
    return (
      <RoxStyleProvider>
        <Page title="Progress">
          <Page.Intro main="normal" />
          <View style={styles.btnWithMargin} >
            <Progress rate={0.8} style={{ width: 666, height: 10 }} barStyle={{backgroundColor: '#ff0000'}} />
          </View>
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
    marginBottom: 20,
    marginRight: 20
  }
};

render(<App />);
