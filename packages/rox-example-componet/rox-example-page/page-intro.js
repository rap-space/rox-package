import { createElement, Component, render } from 'rax';
import View from 'nuke-view';
import Text from 'nuke-text';

class PageIntro extends Component {
  static defaultProps = {
    main: '',
    mainStyle: {},
    sub: '',
    subStyle: {}
  }
  render() {
    const { main, mainStyle, sub, subStyle} = this.props;

    return (
      <View style={initialStyle.introStyle}>
        <Text style={{
          ...initialStyle.mainStyle,
          mainStyle
        }}>{ main }</Text>
        <Text style={{
          ...initialStyle.subStyle,
          subStyle
        }}>{ sub }</Text>
      </View>
    );
  }
};

const initialStyle = {
  introStyle: {
    height: 120,
    width: 750,
    display: 'flex',
    flexDirection: 'cloumn',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#999999'
  },
  mainStyle: {
    fontSize: 28
  },
  subStyle: {
    fontSize: 24
  }
};

export default PageIntro;