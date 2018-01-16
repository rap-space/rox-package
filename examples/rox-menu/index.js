console.log('rox-menu demo start');
import { createElement, Component, render } from 'rax';
import View from 'nuke-view';
import Text from 'nuke-text';

import Menu from '../../packages/rox-menu';

class App extends Component {
  state = {
    selectedIndex: 1,
  }

  onSelect = (selectedIndex) => {

    this.setState({
      selectedIndex,
    })
  }

  render() {
    const { selectedIndex } = this.state;

    return (
      <View style={styles.root}>

        <Menu
          list={['货品名', '订单号', '测试1', '测试2']}
          selectedIndex={selectedIndex}
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
