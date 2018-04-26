/** @jsx createElement */
import {createElement, Component, render} from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from '../rox-example-page';
// eslint-disable-next-line
import View from 'nuke-view';
// eslint-disable-next-line
import Text from 'nuke-text';
import Image from 'rox-image';
import Tabbar from 'rox-tabbar';


const iconsMap = {
  tab1: {
    icon: '\ue702',
    name: '首页'
  },
  tab2: {
    icon: '\ue728',
    name: '设置'
  }
};

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.state = {
      activeKey: {key: 'tab1'}
    };
  }

  renderContent = (pageText) => {
    return (
      <View style={[styles.tabContent]}>
        <Text style={styles.tabText}>Tabbar 经典实用场景 {pageText}</Text>
      </View>
    );
  }
  renderItemWithIcon = (iconName, isActive, key) => {
    return (
      <View style={styles.item}>

        <Text style={[styles.itemText, isActive ? styles.activeText : {}]}>{iconsMap[iconName].name}</Text>
      </View>
    );
  }
  render() {
    return (
      <Tabbar iconBar={true} activeKey={this.state.activeKey}>
        <Tabbar.Item
          tabKey="tab1"
          render={() => this.renderItemWithIcon('tab1')}>
          {this.renderContent('tab1')}
        </Tabbar.Item>
        <Tabbar.Item
          tabKey="tab2"
          render={() => this.renderItemWithIcon('tab2')}>
          {this.renderContent('tab2')}
        </Tabbar.Item>
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
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontFamily: 'tabicons',
    fontSize: 52,
    color: '#999999'
  },

  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 6,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 24
  },
  activeText: {
    color: '#3089dc'
  }
};

render(<App />);
