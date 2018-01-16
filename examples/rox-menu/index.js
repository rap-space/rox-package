console.log('rox-menu demo start');
import { createElement, Component, render } from 'rax';
import View from 'nuke-view';
import Text from 'nuke-text';

import Menu from '../../packages/rox-menu';

const mock1 = [
  {
    label: '测试1',
  },
  {
    label: '测试2',
  },
  {
    label: '测试3',
  }
];

const mock2 = [
  {
    label: '测试1',
    value: '测试1-value',
    icon: 'https://gw.alicdn.com/tfs/TB1uHahncLJ8KJjy0FnXXcFDpXa-26-23.png',
    iconSelected: 'https://gw.alicdn.com/tfs/TB1q.k4kyqAXuNjy1XdXXaYcVXa-40-28.png',
    position: 'left',
  },
  {
    label: '测试2',
    value: '测试2-value',
    icon: 'https://gw.alicdn.com/tfs/TB1uHahncLJ8KJjy0FnXXcFDpXa-26-23.png',
    iconSelected: 'https://gw.alicdn.com/tfs/TB1q.k4kyqAXuNjy1XdXXaYcVXa-40-28.png',
    position: 'left',
  },
  {
    label: '测试3',
    value: '测试2-value',
    icon: 'https://gw.alicdn.com/tfs/TB1uHahncLJ8KJjy0FnXXcFDpXa-26-23.png',
    iconSelected: 'https://gw.alicdn.com/tfs/TB1q.k4kyqAXuNjy1XdXXaYcVXa-40-28.png',
    position: 'left',
  },
];

class App extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Text>mock1</Text>
        <Menu
          dataSource={mock1}
          selected={[1, 2]}
          onSelect={this.onSelect}
          style={{
            width: 500,
          }} />
        <Text>mock2</Text>
        <Menu
          dataSource={mock2}
          selected={[1, 2]}
          onSelect={this.onSelect}

          styleText={{fontSize: 16, color: '#f0f'}}
          styleTextActive={{fontSize: 16, color: '#ff0'}}
          styleIcon={{marginRight: 10}}
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
