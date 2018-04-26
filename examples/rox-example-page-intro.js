import { createElement, Component, render } from 'rax';
import View from 'nuke-view';
import Text from 'nuke-text';

class PageIntro extends Component {
  render () {
    const { main='', mainStyle={} } = this.props;

    return (
      <View style={{
        ...initialStyle,
        ...mainStyle
      }}>
        <Text>{ main }</Text>
      </View>
    );
  }
};

const initialStyle = {
  fontSize: 28,
  color: '#999999',
  height: 120,
  width: 750,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default PageIntro;