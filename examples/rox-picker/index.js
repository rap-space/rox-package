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
import Picker from 'rox-picker';

let App = class NukeDemoIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '女'
    };
  }

  handleSelected = (index, item) => {
    this.setState({
      data: index
    });
  };

  render() {
    return (
      <RoxStyleProvider>
        <Page title="Picker">
          <View style={styles.result}>
            {this.state.data ? (
              <Text style={styles.resultText}>选择了：{this.state.data}</Text>
            ) : null}
          </View>
          <View style={styles.row}>
            <Text style={{ fontSize: 28 }}>选择性别 </Text>
            <Picker
              selectedValue={'女'}
              style={{
                fontSize: 28
              }}
              onValueChange={this.handleSelected}
            >
              <Picker.Item value={'男'} label={'男'} />
              <Picker.Item value={'女'} label={'女'} />
            </Picker>
          </View>
        </Page>
      </RoxStyleProvider>
    );
  }
};

const styles = {
  row: {
    flexDirection: 'row',
    paddingLeft: '40rem',
    marginBottom: '30rem'
  },
  result: {
    height: '480rem',
    margin: '30rem',
    padding: '10rem',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultText: {
    fontSize: '28rem'
  },
  btns: {
    margin: '30rem'
  },
  btn: {
    marginBottom: '30rem'
  }
};

render(<App />);
