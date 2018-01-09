/** @jsx createElement */
/* eslint-disable import/no-extraneous-dependencies */
import { createElement, Component, render } from 'rax';
import SearchBar from 'rox-search-bar';
import Page from 'nuke-page';
import View from 'nuke-view';
import Text from 'nuke-text';

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      value2: '',
      value3: ''
    };
  }

  search = (data, e) => {
    this.setState({
      value: data.value
    });
  };
  searchOnReturn2 = data => {
    this.setState({
      value2: data.value
    });
  };
  searchOnReturn3 = data => {
    this.setState({
      value3: data.value
    });
  };
  render() {
    return (
      <Page title="SearchBar">
        <Page.Intro main="normal" />
        <SearchBar
          style={styles.wrap}
          onSearch={this.search}
          placeholder="输入搜索关键词"
        />
        <View style={styles.relatedView}>
          <Text style={styles.result}>要搜索的值：{this.state.value}</Text>
        </View>
        <SearchBar
          style={styles.wrap}
          onSearch={this.searchOnReturn2}
          showSearchButton={false}
          placeholder="回车搜索"
        />
        <View style={styles.relatedView}>
          <Text style={styles.result}>要搜索的值：{this.state.value2}</Text>
        </View>
        <View style={styles.relatedView}>
          <Text style={styles.result}>要搜索的值：{this.state.value3}</Text>
        </View>
      </Page>
    );
  }
};
const styles = {
  wrap: {
    backgroundColor: '#EBECF0'
  },
  relatedView: {
    padding: '20rem'
  },
  dark: {
    backgroundColor: '#333333'
  },
  input: {
    borderRadius: 30,
    backgroundColor: '#E4F0FD'
  },
  result: {
    fontSize: 28,
    color: '#999999'
  }
};
render(<App />);
