/** @jsx createElement */
import {createElement, Component, render} from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';
// eslint-disable-next-line
import Text from 'nuke-text';

import Tabbar from 'rox-tabbar';


let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.state = {
      activeKey: { key: 'tab1' }
    };
  }

  renderContent = pageText => {
    return (
      <View style={[styles.tabContent]}>
        <Text style={styles.tabText}>{pageText}</Text>
      </View>
    );
  };
  renderItem = (key, isActive) => {
    return (
      <View style={[styles.item, isActive ? styles.itemActive : {}]}>
        <Text style={[styles.itemText, isActive ? styles.itemTextActive : {}]}>
          {key}
        </Text>
      </View>
    );
  };
  render() {
    return (
      <Tabbar itemStyle={{ height: 88 }} activeKey={this.state.activeKey}>
        <Tabbar.Item
          tabKey="tab1"
          render={() => this.renderItem.bind(this, 'Embed1')}
          src="https://air.1688.com/rap/23067452/index.html?wh_weex=true"
        />
        <Tabbar.Item
          tabKey="tab2"
          render={() => this.renderItem.bind(this, 'Embed2')}
          src="https://air.1688.com/rap/23067452/navigator.html?wh_weex=true"
        />
      </Tabbar>
    );
  }
};

const styles = {
  tabContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabText: {
    fontSize: 40
  },
  item: {
    height: 88,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemActive: {
    backgroundColor: '#ff6600'
  },
  itemText: {
    fontSize: 24,
    color: '#333333'
  },
  itemTextActive: {
    color: '#ffffff'
  }
};

render(<App />);
