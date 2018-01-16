console.log('rox-menu demo start');
import { createElement, Component, render } from 'rax';
import View from 'nuke-view';
import Text from 'nuke-text';

import Menu from '../../packages/rox-menu';

const mock = [
  {
    label: '测试1',
    value: '测试1-value',
    icon: '',
    iconSelected: 'https://gw.alicdn.com/tfs/TB1q.k4kyqAXuNjy1XdXXaYcVXa-40-28.png',
    position: 'right',
  },
  {
    label: '测试1',
    value: '测试1-value',
    icon: '',
    iconSelected: 'https://gw.alicdn.com/tfs/TB1q.k4kyqAXuNjy1XdXXaYcVXa-40-28.png',
    position: 'right',
  },
  {
    label: '测试1',
    value: '测试1-value',
    icon: '',
    iconSelected: 'https://gw.alicdn.com/tfs/TB1q.k4kyqAXuNjy1XdXXaYcVXa-40-28.png',
    position: 'right',
  }
];

class App extends Component {
  render() {
    return (
      <View style={styles.root}>

        <Menu
          dataSource={mock}
          selected={[1, 2]}
          onSelect={this.onSelect}
          style={{
            width: 500,
          }} />
      </View>
    );
  }
}

var styles = {
  root: {
    width: 750,
    paddingTop: 50,
    paddingRight: 50,
    paddingBottom: 50,
    paddingLeft: 50,
  }
}
render(<App />);
