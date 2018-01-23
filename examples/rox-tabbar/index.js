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
      activeKey: {key: 'tab1'}
    };
  }
  renderContent = (pageText) => {
    return (
      <View style={[styles.tabContent]}>
        <Text style={styles.tabText}>{pageText}</Text>
      </View>
    );
  }

  render() {
    return (

      <Tabbar style={styles.tabbar} iconBar={true} itemStyle={styles.item} navStyle={{active: styles.activeTab, inactive: styles.inActiveTab}} activeKey={this.state.activeKey}>
        <Tabbar.Item
          title={'首页'}
          tabKey="tab1"
          icon={{src: 'https://img.alicdn.com/tfs/TB10sQhRFXXXXa6XVXXXXXXXXXX-130-128.png', selected: 'https://img.alicdn.com/tfs/TB1aW7mRFXXXXXIXVXXXXXXXXXX-130-128.png', size: 'small', style: {marginBottom: '6rem'}}}
        >
          {this.renderContent('tab1')}
        </Tabbar.Item>
        <Tabbar.Item
          title={'设置'}
          tabKey="tab2"
          icon={{src: 'https://img.alicdn.com/tfs/TB1rpILRFXXXXc1XXXXXXXXXXXX-128-128.png', selected: 'https://img.alicdn.com/tfs/TB1WHsqRFXXXXciXFXXXXXXXXXX-128-128.png', size: 'small', style: {marginBottom: '6rem'}}}
        >
          {this.renderContent('tab2')}
        </Tabbar.Item>
      </Tabbar>

    );
  }
};

const styles = {
  tabbar: {
    flex: 1
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabText: {
    fontSize: '40rem'
  },
  item: {
    height: '100rem',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTab: {
    color: '#3089dc',
    backgroundColor: '#dddddd',

  },
  inActiveTab: {

  }
};

render(<App />);
