import { createElement, render, Component } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Menu from 'rox-menu';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';

let App = class NukeDemoIndex extends Component {
  render() {
    return (
      <RoxStyleProvider>
        <Page title="Menu">
          <Page.Intro main="default" />
          <View style={styles.btnWithMargin}>
            <Menu dataSource={
              [
                {
                  label: '测试1',
                },
                {
                  label: '测试2',
                  // iconPosition: 'left', 左侧视觉规范未定, 暂无支持
                },
                {
                  label: '测试3',
                }
              ]
            } selected={[1, 2]} />

          </View>

        </Page>
      </RoxStyleProvider>
    );
  }
};

const styles = {
  btnWithMargin: {
    // flexDirection: 'row',
    marginTop: 30,
    minHeight: 100,
    marginBottom: 50,
    marginLeft: 42,
    marginRight: 42,
  },
  btn: {
    marginBottom: 20,
    marginRight: 20
  }
};
render(<App />);
