/** @jsx createElement */
import { createElement, Component, render } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';
// eslint-disable-next-line
import Text from 'nuke-text';
import Radio from 'rox-radio';

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.state = {
      checked: false
    };
  }

  onChange = () => {
    let tmp = this.state.checked;
    this.setState({
      checked: !tmp
    });
  };
  onPress() {
    let tmp = this.state.checked;
    this.setState({
      checked: !tmp
    });
  }
  getChangeResult = value => {
    console.log(value);
  };

  render() {
    return (
      <RoxStyleProvider>
        <Page title="Radio">
          <Page.Intro sub={'通过外部 state 控制选中状态'} />
          <View style={styles.demo_result}>
            <Text>this.state.checked : {this.state.checked}</Text>
          </View>
          <View style={styles.demo_item}>
            <Radio
              ref="x"
              size="small"
              checked={this.state.checked}
              onChange={this.onChange}
            />
            <Text>浙江省</Text>
          </View>

          <Page.Intro sub={'Radio 内部自由切换，不受外部 state 控制'} />
          <View style={styles.demo_item}>
            <Radio
              ref="xx"
              size="small"
              defaultChecked={this.state.checked}
              onChange={this.getChangeResult}
            />
            <Text>杭州</Text>
          </View>
        </Page>
      </RoxStyleProvider>
    );
  }
};

const styles = {
  demo_item: {
    height: 104,
    marginBottom: 30,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12
  },
  demo_result: {
    backgroundColor: '#ffffff',
    paddingLeft: 32,
    height: 60,
    justifyContent: 'center',
    color: '#666666'
  }
};
render(<App />);
