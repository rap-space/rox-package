/** @jsx createElement */
import { createElement, PureComponent, Component, render } from 'rax';
import RoxStyleProvider from 'rox-theme-provider';
// eslint-disable-next-line
import Page from '../../packages/rox-example-componet/rox-example-page';
// eslint-disable-next-line
import View from 'nuke-view';
import Text from 'nuke-text';
import RefreshControl from 'rox-refresh-control';
import Touchable from 'rox-touchable';
import ListView from 'rox-listview';

const originalData = [];

for (let i = 0; i < 20; i++) {
  originalData.push({ id: i, text: '列表项' });
}

class ListItem extends PureComponent {
  render() {
    const { id, text, onPress } = this.props;
    return (
      <Touchable
        id={`cell_${id}`}
        style={styles.cellItem}
        onPress={() => {
          onPress(id);
        }}
      >
        <Text style={styles.itemTextList}>{text}-{id}</Text>
      </Touchable>
    );
  }
}

class ListViewDemo extends Component {
  constructor() {
    super();
    this.state = {
      data: [...originalData],
      isRefreshing: false,
      showLoading: true,
      refreshText: '↓ 下拉刷新',
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  onItemPress(index) {
    console.log(`clicked ${index}`);
  }

  onRefresh(e) {
    this.setState({
      isRefreshing: true,
      refreshText: '加载中',
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
        data: [...originalData],
        refreshText: '↓ 下拉刷新',
      });
    }, 1000);
  }

  onLoadMore() {
    // 模拟网络加载
    setTimeout(() => {
      this.state.data.push({
        id: 'b100',
        text: '新数据',
      });
      this.setState({
        data: this.state.data,
      });
    }, 300);
  }

  renderHeader() {
    return (
      <RefreshControl
        style={styles.refresh}
        refreshing={this.state.isRefreshing}
        onRefresh={this.onRefresh}
      >
        <Text style={styles.loadingText}>{this.state.refreshText}</Text>
      </RefreshControl>
    );
  }
  renderItem(item, index) {
    return (
      <ListItem id={item.id} text={item.text} onPress={this.onItemPress} />
    );
  }
  renderFooter() {
    this.state.showLoading ? (
      <View style={[styles.loading]}>
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    ) : null;
  }
  render() {
    const { data } = this.state;
    return (
      <RoxStyleProvider>
        <ListView
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
          renderRow={this.renderItem}
          dataSource={data}
          style={styles.listContainer}
          onEndReached={this.onLoadMore}
        />
      </RoxStyleProvider>
    );
  }
}
const styles = {
  listContainer: {
    flex: 1,
  },
  cellItem: {
    backgroundColor: '#ffffff',
    'backgroundColor:active': '#f2f3f7',
    height: 160,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#e6e7eb',
  },
  itemTextList: {
    fontSize: 32,
    color: '#5F646E',
  },
  refresh: {
    height: 80,
    width: 750,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    height: 80,
    width: 750,
    flexDirection: 'row',
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#666666',
  },
};

render(<ListViewDemo />);
