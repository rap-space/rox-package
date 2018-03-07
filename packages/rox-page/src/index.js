import { createElement, Component, PropTypes as T } from 'rax';
import ThemeProvider from 'rox-theme-provider';
import tracePVLog from './utils/tracePVLog';
import setTitle from './utils/setTitle';
import setRetcodeConfig from './utils/setRetcodeConfig';
import { setIn } from './utils/xpath';

class RoxPage extends Component {
  static propTypes = {
    title: T.string
  }

  componentWillMount() {
    const { title } = this.props;
    let pageData = null;

    try {
      pageData = window.require('@page/data');
    } catch (e) {
      // TODO: traceGoldlog error
    }

    if (pageData) {
      /**
       * setTitle 的逻辑优先级（优先级高低从上至下）：
       *
       * 1. 来自 props 的 title
       * 2. 在 `@page/data` 中的 title
       */
      setIn(pageData, 'metaData.title', title);

      tracePVLog(pageData);
      setTitle(pageData);
      setRetcodeConfig(pageData);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.title !== nextProps.title) {
      setTitle(nextProps.title);
    }
  }

  render() {
    const { children, ...others } = this.props;

    return (
      <ThemeProvider {...others}>
        {children}
      </ThemeProvider>
    );
  }
}

export default RoxPage;
