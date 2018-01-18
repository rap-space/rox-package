/** @jsx createElement */
/* eslint-disable import/no-extraneous-dependencies */
import { createElement, Component, render } from 'rax';
import { MultiRow } from 'nuke-layout';
import Page from 'nuke-page';
import View from 'nuke-view';
import Text from 'nuke-text';
import Icon, { getTypeIconNames } from 'rox-icon';

const App = class NukeDemoIndex extends Component {
  renderGridCell = (item, index) => {
    return (
      <View style={styles.iconCell}>
        <Icon style={styles.icon} name={item} type="iconfont" />
        <Text style={styles.iconShowCode}>{item}</Text>
      </View>
    );
  };

  render() {
    return (
      <Page title="Icon">
        <Page.Intro main="方形图片" />
        <View style={styles.listLine}>
          <Icon
            style={styles.icon}
            src="https://img.alicdn.com/tfs/TB1vUv.JFXXXXbAXFXXXXXXXXXX-50-50.png"
          />
          <View>
            <Text>一行文字</Text>
          </View>
        </View>
        <Page.Intro main="自带的 iconfont 集合" />
        <View style={styles.lineWithMargin}>
          <MultiRow
            dataSource={getTypeIconNames('default')}
            rows={3}
            renderRow={this.renderGridCell}
          />
        </View>
      </Page>
    );
  }
};

const styles = {
  icon: {
    fontSize: 80,
    marginBottom: 20,
    color: 'rgb(102, 102, 102)'
  },
  iconCell: {
    justifyContent: 'center',
    height: '180rem',
    alignItems: 'center',
    borderWidth: '1rem',
    borderColor: '#eeeeee',
    borderStyle: 'solid'
  },
  new: {
    fontSize: 68,
    color: '#3089dc'
  },
  listLine: {
    marginLeft: '40rem',
    marginRight: '40rem',
    padding: '20rem',
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  lineWithMargin: {
    marginLeft: '40rem',
    marginRight: '40rem',
    backgroundColor: '#ffffff'
  },

  iconShowCode: {
    fontSize: 24,
    color: '#999999'
  }
};

render(<App />);
