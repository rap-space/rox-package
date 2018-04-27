import { createElement, Component, render } from 'rax';
import View from 'nuke-view';
import Text from 'nuke-text';
import PageIntro from './page-intro';

class Page extends Component {
  static defaultProps = {
    title: '',
    titleStyle: {},
    pageStyle: {}
  }

  render() {
    const { children, title, titleStyle, pageStyle } = this.props;

    return (
      <View style={{
        ...initialStyle.pageStyle,
        pageStyle
      }}>
        <View style={{
          ...initialStyle.titleStyle,
          ...titleStyle
        }}>
          <Text>{ title }</Text>
        </View>
        { children }
      </View>
    );
  }
};

Page.Intro = PageIntro;

const initialStyle = {
  pageStyle: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    height: '100%'
  },
  titleStyle: {
    width: 750,
    height: 96,
    fontSize: 36,
    color: '#FFFFFF',
    background: '#5D5D5F',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Page;