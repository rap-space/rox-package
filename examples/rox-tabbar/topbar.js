/** @jsx createElement */
import {createElement, Component, render} from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';

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
      activeKey: {key: 'tab1'}
    };
  }
  renderContent = (pageText) => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.tabText}>Tabbar 在顶部的场景，一般不放 icon</Text>
        <Text style={styles.tabText}>{pageText}</Text>
      </View>
    );
  }
  renderItem = (Name, isActive, key) => {
    return (<View style={styles.item}>
      <Text style={[styles.itemText, isActive ? styles.activeText : {}]}>{Name}</Text>
    </View>);
  }

  render() {
    return (

      <Tabbar navTop={true} navStyle={{active: styles.activeBorder}} activeKey={this.state.activeKey} itemStyle={{height: 70}}>
        <Tabbar.Item
          tabKey="tab1"
          style={styles.item}
          render={() => this.renderItem( '已买到')}>
          {this.renderContent('tab1')}
        </Tabbar.Item>
        <Tabbar.Item
          tabKey="tab2"
          render={() => this.renderItem( '已卖出')}>
          {this.renderContent('tab2')}
        </Tabbar.Item>
        <Tabbar.Item
          tabKey="tab3"
          render={() => this.renderItem( '我的购物篮')}>
          {this.renderContent('tab3')}
        </Tabbar.Item>
      </Tabbar>

    );
  }
};

const styles = {
  tabContent: {
    flex: 1,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabText: {
    fontSize: 30,
    textAlign: 'center'
  },
  item: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeText: {
    color: '#ff6600'
  },
  activeBorder: {
    borderBottomColor: '#ff6600'
  }
};

render(<App />);
