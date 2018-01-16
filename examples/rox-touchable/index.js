/** @jsx createElement */
import { createElement, render, Component } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';
import Text from 'nuke-text';
import Touchable from 'rox-touchable';

class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
  }
  pressX = (e) => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <RoxStyleProvider>
        <Page title="Touchable">
          <Page.Intro main="Normal"></Page.Intro>
          <View style={styles.result}>
            {this.state.count
              ? <Text style={styles.resultText}>点击 {this.state.count}
                  次</Text>
              : null}
          </View>
          <View style={styles.btns}>
            <Touchable
              style={styles.touch}
              activeStyle={{
              backgroundColor: '#FF6000'
            }}
              onPress={this
              .pressX
              .bind(this)}>
              <Text style={styles.touchText}>点击</Text>
            </Touchable>
          </View>

        </Page>
      </RoxStyleProvider>
    )
  }
}
const styles = {
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
  touch: {
    backgroundColor: '#ff6000',
    height: '56rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchText: {
    color: '#ffffff',
    fontSize: '28rem'
  }
}

render(<App/>);
