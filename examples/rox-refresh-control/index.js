/** @jsx createElement */
import { createElement, Component, render } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'rox-example-page';
// eslint-disable-next-line
import View from 'nuke-view';
// eslint-disable-next-line
import Text from 'nuke-text';
import ScrollView from 'rox-scrollview';
import RefreshControl from 'rox-refresh-control';

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.state = {
      isRefreshing: false,
      refreshText: '↓ 下拉刷新',
      data: [
        {
          key: 'A',
          bg: '#1170bc',
          color: '#ffffff'
        },
        {
          key: 'B',
          bg: '#3089dc',
          color: '#ffffff'
        },
        {
          key: 'C',
          bg: '#f1f1f1',
          color: '#3d4145'
        },
        {
          key: 'F',
          bg: 'yellow',
          color: '#ffffff'
        },
        {
          key: 'G',
          bg: 'red',
          color: '#ffffff'
        }
      ]
    };
  }
  getViews() {
    let doms = [];
    this.state.data.map((item, index) => {
      doms.push(
        <View
          style={[
            styles.item,
            {
              backgroundColor: item.bg
            }
          ]}
        >
          <Text
            style={{
              color: item.color
            }}
          >
            {item.key}
          </Text>
        </View>
      );
    });

    return doms;
  }

  handleRefresh = () => {
    this.setState({ isRefreshing: true, refreshText: '加载中' });
    // mock ajax
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
        data: [
          {
            key: 'D',
            bg: '#ff6600',
            color: '#ffffff'
          }
        ].concat(this.state.data),
        refreshText: '↓ 下拉刷新'
      });
    }, 1000);
  };
  loadmore = () => {
    // 底部加载更多
    this.setState({
      data: this.state.data.concat([
        {
          key: 'E',
          bg: '#B91630',
          color: '#ffffff'
        }
      ])
    });
  };
  render() {
    return (
      <RoxStyleProvider>
        <ScrollView
          ref="vscroller"
          style={styles.vscroller}
          onEndReachedThreshold={20}
          onEndReached={this.loadmore}
        >
          <RefreshControl
            refreshing={this.state.isRefreshing}
            style={[styles.itemRefresh]}
            onRefresh={this.handleRefresh}
          >
            <Text
              style={{
                fontSize: '28rem',
                color: '#3089dc'
              }}
            >
              {this.state.refreshText}
            </Text>
          </RefreshControl>
          {this.getViews()}
        </ScrollView>
      </RoxStyleProvider>
    );
  }
};
const styles = {
  vscroller: {
    flex: 1
  },
  itemRefresh: {
    width: 750,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    height: '300rem',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

render(<App />);
