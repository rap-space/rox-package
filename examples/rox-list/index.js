/** @jsx createElement */
import { createElement, Component, findDOMNode, render } from 'rax';
import RoxStyleProvider from 'rox-theme-provider';
// eslint-disable-next-line
// eslint-disable-next-line
import ListView from 'rox-listview';
import View from 'rox-view';
import Page from 'rox-example-page';
import ListItem from 'rox-list';

import Text from 'rox-text';
import Button from 'rox-button';
import Loading from 'rox-loading';

class NukeDemoIndex extends Component {
  constructor() {
    super();

    this.renderItem = this.renderItem.bind(this);
  }

  // render Header
  renderBasicHeader() {
    return <Text style={styles.headerText}>Basic List</Text>;
  }

  renderSingleLineHeader() {
    return <Text style={styles.headerText}>Single Line List</Text>;
  }

  renderTwoLinesHeader() {
    return <Text style={styles.headerText}>Two Lines List</Text>;
  }

  handleListItemClick(ev, item) {
    console.log('click list item', ev, item);
  }

  // render Item
  renderItem(props) {
    return <ListItem {...props} clickHandle={this.handleListItemClick} />;
  }

  render() {
    // basic config data
    const basicList = [{
      title: '标题'
    }, {
      title: '标题带链接',
      type: 'href',
      href: 'https://www.1688.com'
    }, {
      title: '禁止点击',
      type: 'href',
      href: 'https://www.1688.com',
      disabled: true
    }, {
      title: '标题可选择',
      type: 'select'
    }, {
      title: '禁止点击',
      type: 'select',
      disabled: true
    }];

    // single line config data
    const singleLineList = [{
      title: '姓名',
      rightEle: '请填写'
    }, {
      title: '电话',
      rightEle: '请填写'
    }, {
      title: '备注',
      type: 'href',
      href: 'https://www.1688.com',
      rightEle: '猫头怪'
    }, {
      title: '所属分组',
      type: 'href',
      href: 'https://www.1688.com',
      rightEle: '零售客户'
    }, {
      title: '生意参谋',
      type: 'href',
      href: 'https://www.1688.com',
      thumb: 'https://img.alicdn.com/tfs/TB1XewBxXOWBuNjy0FiXXXFxVXa-32-32.png',
      thumbHeight: 32
    }, {
      title: '进货单',
      type: 'href',
      href: 'https://www.1688.com',
      thumb: 'https://gw.alicdn.com/tfs/TB1WkExxbGYBuNjy0FoXXciBFXa-32-32.png',
      thumbHeight: 32
    }, {
      title: '微分销',
      type: 'href',
      href: 'https://www.1688.com',
      thumb: 'https://gw.alicdn.com/tfs/TB1WQExxbGYBuNjy0FoXXciBFXa-32-32.png',
      thumbHeight: 32
    }, {
      title: '诚e赊',
      type: 'select',
      thumb: 'https://gw.alicdn.com/tfs/TB1WkExxbGYBuNjy0FoXXciBFXa-32-32.png',
      thumbHeight: 32,
      rightEle: '当前可用额度：12497元'
    }, {
      title: '支付宝',
      type: 'select',
      thumb: 'https://gw.alicdn.com/tfs/TB1WQExxbGYBuNjy0FoXXciBFXa-32-32.png',
      thumbHeight: 32,
      rightEle: '资金将直接付至对方账户'
    }];

    // two lines config data
    const twoLinesList = [{
      title: '诚e赊',
      type: 'select',
      brief: '当前可用额度：12497元',
      thumb: 'https://gw.alicdn.com/tfs/TB1WkExxbGYBuNjy0FoXXciBFXa-32-32.png',
      thumbHeight: 32,
    }, {
      title: '娃在旅途',
      brief: '地理位置方便，附近很多逛的。',
      thumb: 'https://gw.alicdn.com/tfs/TB1vbR5xv1TBuNjy0FjXXajyXXa-300-300.jpg',
      thumbHeight: 32,
      rightEle: <Button type="primary" size="small">按钮</Button>
    }];

    return (
      <RoxStyleProvider>
        {/* basic */}
        <ListView
          renderHeader={this.renderBasicHeader}
          renderFooter={this.renderFooter}
          renderRow={this.renderItem}
          dataSource={basicList}
          style={styles.listContainer}
          onEndReached={this.onLoadMore}
        />

        {/* single line */}
        <ListView
          renderHeader={this.renderSingleLineHeader}
          renderFooter={this.renderFooter}
          renderRow={this.renderItem}
          dataSource={singleLineList}
          style={styles.listContainer}
          onEndReached={this.onLoadMore}
        />

        {/* two lines */}
        <ListView
          renderHeader={this.renderTwoLinesHeader}
          renderFooter={this.renderFooter}
          renderRow={this.renderItem}
          dataSource={twoLinesList}
          style={styles.listContainer}
          onEndReached={this.onLoadMore}
        />
      </RoxStyleProvider>
    );
  }
};

const styles = {
  headerText: {
    fontSize: 28,
    color: '#666666',
    marginLeft: 24,
    marginTop: 20,
    marginBottom: 20
  }
};

render(<NukeDemoIndex />);
