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

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
  }
  renderHeader() {

  }
  renderFooter() {

  }
  renderItem(props) {
    console.log(props);
    return (<ListItem title="abc" iconName="icon">
      <View style={{ width: 50 }}><Text>1</Text>
      </View>
    </ListItem>);
  }

  onLoadMore() {

  }
  render() {
    let data = [{
      abc: '1'
    }];
    return (
      <RoxStyleProvider>
        {this.renderItem()}
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
};

const styles = {
  listContainer: {

  }
};

render(<App />);
