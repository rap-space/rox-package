import { createElement, Component, render } from 'rax';
import View from 'nuke-view';
import Text from 'nuke-text';

class PageIntro extends Component {
  static defaultProps = {
    introStyle: {},
    main: '',
    mainStyle: {},
    sub: '',
    subStyle: {}
  }
  render() {
    const { introStyle, main, mainStyle, sub, subStyle} = this.props;
    const realIntroStyle = Object.assign({}, initialStyle.introStyle, introStyle);
    const realMainStyle = Object.assign({}, initialStyle.mainStyle, mainStyle);
    const realSubStyle = Object.assign({}, initialStyle.subStyle, subStyle);

    return (
      <View style={realIntroStyle}>
        <View style={realMainStyle}>
          <Text>{ main }</Text>
        </View>
        <View style={realSubStyle}>
          <Text>{ sub }</Text>
        </View>
      </View>
    );
  }
};

const initialStyle = {
  introStyle: {
    height: 120,
    width: 750,
    color: '#999999',
    display: 'flex',
    flexDirection: 'cloumn',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainStyle: {
    fontSize: 28
  },
  subStyle: {
    fontSize: 28
  }
};

export default PageIntro;