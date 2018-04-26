import { createElement, render, Component } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import { TagSelector } from 'rox-tag';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from '../rox-example-page';
// eslint-disable-next-line
import View from 'nuke-view';

const App = class NukeDemoIndex extends Component {
  state = {
    value: 3,
    value2: 1
  };

  handleChange = value => {
    console.log('value', value);
  };

  handleChange1 = value => {
    console.log('value', value);

    this.setState({
      value
    });
  };

  handleChange2 = value => {
    console.log('value', value);

    this.setState({
      value2: value
    });
  };

  render() {
    return (
      <RoxStyleProvider>
        <Page title="TagSelector">
          <Page.Intro main={'非受控'} />
          <View style={styles.btnWithMargin}>
            <TagSelector
              onChange={this.handleChange}
              defaultValue={3}
              dataSource={[
                { label: '手机专享', value: 0 },
                { label: '零售利润：40%-60%', value: 1 },
                { label: '黑暗料理', value: 2 },
                { label: '土耳其烤肉', value: 3 }
              ]}
            />
          </View>
          <Page.Intro main={'受控'} />
          <View style={styles.btnWithMargin}>
            <TagSelector
              onChange={this.handleChange1}
              value={this.state.value}
              dataSource={[
                { label: '手机专享', value: 0 },
                { label: '零售利润：40%-60%', value: 1 },
                { label: '黑暗料理', value: 2 },
                { label: '土耳其烤肉', value: 3 }
              ]}
            />
          </View>
          <Page.Intro main={'多选非受控'} />
          <View style={styles.btnWithMargin}>
            <TagSelector
              multiple
              defaultValue={3}
              dataSource={[
                { label: '手机专享', value: 0 },
                { label: '零售利润：40%-60%', value: 1 },
                { label: '黑暗料理', value: 2 },
                { label: '土耳其烤肉', value: 3 }
              ]}
            />
          </View>
          <Page.Intro main={'多选受控'} />
          <View style={styles.btnWithMargin}>
            <TagSelector
              multiple
              onChange={this.handleChange2}
              value={this.state.value2}
              dataSource={[
                { label: '手机专享', value: 0 },
                { label: '零售利润：40%-60%', value: 1 },
                { label: '黑暗料理', value: 2 },
                { label: '土耳其烤肉', value: 3 }
              ]}
            />
          </View>
        </Page>
      </RoxStyleProvider>
    );
  }
};

const styles = {
  btnWithMargin: {
    flexDirection: 'row',
    marginTop: 30,
    minHeight: 100,
    marginBottom: 50,
    marginLeft: 42,
    marginRight: 42
  },
  btn: {
    marginBottom: 20,
    marginRight: 20
  }
};

render(<App />);
