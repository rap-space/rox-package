import { createElement, render, Component } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import { TagSelector } from 'rox-tag';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';

const App = class NukeDemoIndex extends Component {
  render() {
    return (
      <RoxStyleProvider>
        <Page title="Tag">
          <Page.Intro main="normal" />
          <View style={styles.btnWithMargin}>
            <TagSelector dataSource={[{ label: '手机专享', value: 0 }, { label: '零售利润：40%-60%', value: 1 }]} />
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
