/** @jsx createElement */
import { createElement, Component, render } from 'rax';
import { ThemeProvider, Checkbox, Theme, View, Text } from 'rox-components';
import Page from 'nuke-page';

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
          <Page.Intro sub="普通样式" />
          <View style={styles.demo_item}>
            <View style={styles.group_item}>
              <Checkbox
                defaultChecked={true}
                size="small"
                onChange={this.onChange}
              />
              <Text>苹果</Text>
            </View>
            <View style={styles.group_item}>
              <Checkbox size="small" onChange={this.onChange} />
              <Text>梨</Text>
            </View>
          </View>
          <Page.Intro sub="空心样式" />
          <View style={styles.demo_item}>
            <View style={styles.group_item}>
              <Checkbox
                defaultChecked={true}
                type="empty"
                size="small"
                onChange={this.onChange}
              />
              <Text>苹果</Text>
            </View>
            <View style={styles.group_item}>
              <Checkbox
                size="small"
                type="empty"
                onChange={this.onChange}
              />
              <Text>梨</Text>
            </View>
          </View>
          <Page.Intro sub="list 样式" />
          <View style={[styles.demo_item, { flexDirection: 'column' }]}>
            <View style={styles.group_item}>
              <Checkbox
                defaultChecked={true}
                type="list"
                size="small"
                onChange={this.onChange}
              />
              <Text>浙江省杭州市余杭区</Text>
            </View>
            <View style={styles.group_item}>
              <Checkbox
                size="small"
                type="list"
                onChange={this.onChange}
              />
              <Text>浙江省杭州市临安市</Text>
            </View>
          </View>

          <Page.Intro main="自定义大小颜色" />
          <View style={styles.demo_item}>
            <Checkbox
              style={{ width: '30rem', height: '30rem', fontSize: '20rem' }}
              defaultChecked={true}
              size="small"
              checkedStyle={{ backgroundColor: themeOrange }}
              unCheckedStyle={{ backgroundColor: themeOrange }}
              onChange={this.onChange}
            />
            <Checkbox
              defaultChecked={true}
              size="small"
              type="empty"
              checkedStyle={{ borderColor: themeOrange, color: themeOrange }}
              unCheckedStyle={{ borderColor: themeOrange }}
              onChange={this.onChange}
            />
            <Checkbox
              defaultChecked={true}
              size="small"
              type="list"
              checkedStyle={{ color: themeOrange }}
              onChange={this.onChange}
            />
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
  }
};

render(<App />);
