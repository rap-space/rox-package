/** @jsx createElement */
import {createElement, Component, render} from 'rax';
import {ThemeProvider, Checkbox, Theme} from 'rox-components';
import Page from '../rox-example-page';
import View from 'nuke-view';
import Text from 'nuke-text';

const themeOrange = '#ff6600';

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.state = {
      checked: false
    };
  }

  onChange = (value) => {
    console.log(value);
  }

  render() {
    return (
      <ThemeProvider>
        <Page title="Checkbox">
          <Page.Intro sub={'普通样式'} />
          <View style={styles.demo_item}>
            <View style={styles.group_item}>
              <Checkbox defaultChecked={true} size="small" onChange={this.onChange} />
              <Text>苹果</Text>
            </View>
            <View style={styles.group_item}>
              <Checkbox size="small" onChange={this.onChange} />
              <Text>梨</Text>
            </View>
          </View>
          <Page.Intro sub={'禁用样式'} />
          <View style={styles.demo_item}>
            <View style={styles.group_item}>
              <Checkbox defaultChecked={true} disabled={true} size="small" />
              <Text>苹果</Text>
            </View>
            <View style={styles.group_item}>
              <Checkbox
                size="small"
                disabled={true}
                style={{
                  backgroundColor: '#000'
                }}
                onChange={this.onChange} />
              <Text>梨</Text>
            </View>
          </View>
          <Page.Intro sub={'list 样式'} />
          <View
            style={[
              styles.demo_item, {
                flexDirection: 'column'
              }
            ]}>
            <View style={styles.group_list_item}>
              <Text>浙江省杭州市余杭区</Text>
              <Checkbox
                defaultChecked={true}
                type="list"
                size="small"
                onChange={this.onChange} />
            </View>
            <View style={styles.group_list_item}>
              <Text>浙江省杭州市临安市</Text>
              <Checkbox size="small" type="list" onChange={this.onChange} />
            </View>
          </View>

          <Page.Intro main={'半透明样式'} />
          <View style={styles.demo_item}>
            <Checkbox
              defaultChecked={true}
              size="small"
              checkedStyle={{
                backgroundColor: themeOrange
              }}
              unCheckedStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)'
              }}
              onChange={this.onChange} />
            <Checkbox
              defaultChecked={true}
              size="small"
              type="empty"
              onChange={this.onChange} />
          </View>
        </Page>
      </ThemeProvider>
    );
  }
};

const styles = {
  demo_item: {
    width: 750,
    marginTop: 30,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItem: 'center',
    paddingLeft: 12
  },
  group_item: {
    height: 104,
    flexDirection: 'row',
    borderBottomWidth: '2rem',
    borderBottomStyle: 'solid',
    borderBottomColor: '#F7F8FA',
    alignItems: 'center'
  },
  group_list_item: {
    width: 750,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#F7F8FA',
    borderBottomStyle: 'solid',
    paddingLeft: 20,
    backgroundColor: '#ffffff'
  }
};

render(<App />);
