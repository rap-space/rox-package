import { createElement, render, Component } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import { Tag, TagList } from 'rox-tag';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from '../rox-example-componet/rox-example-page';
// eslint-disable-next-line
import View from 'nuke-view';

let App = class NukeDemoIndex extends Component {
  render() {
    return (
      <RoxStyleProvider>
        <Page title="Tag">
          <Page.Intro main="normal" />
          <View style={styles.btnWithMargin}>
            <Tag>24小时发货</Tag>
          </View>
          <Page.Intro main="primary" />
          <View style={styles.btnWithMargin}>
            <Tag type="primary">24小时发货</Tag>
          </View>
          <Page.Intro main="TagList" />
          <View style={styles.btnWithMargin}>
            <TagList dataSource={['手机专享', '零售利润：40%-60%']} />
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
