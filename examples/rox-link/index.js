/** @jsx createElement */
import { createElement, Component, render } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from '../rox-example-page';
import Link from 'rox-link';

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <RoxStyleProvider>
        <Page title="Link">
          <Page.Intro main={'普通跳转'} />
          <Link
            style={styles.linkItem}
            activeStyle={styles.activeStyle}
            target="_blank"
            href="https://m.taobao.com"
          >
            新窗口跳转到h5页面
          </Link>

          <Page.Intro main={'常见协议支持'} />
          <Link
            style={styles.linkItem}
            activeStyle={styles.activeStyle}
            href="mailto:yichen.hww@alibaba-inc.com"
          >
            支持 mailto: 协议
          </Link>
          <Link
            style={styles.linkItem}
            activeStyle={styles.activeStyle}
            href="sms:10086"
          >
            支持 sms: 10086
          </Link>
        </Page>
      </RoxStyleProvider>
    );
  }
};

const styles = {
  linkItem: {
    flexDirection: 'row',
    marginTop: '30rem',
    fontSize: '28rem',
    marginLeft: '42rem',
    backgroundColor: '#3089dc'
  },
  activeStyle: {
    color: 'red'
  },
  linkInnerText: {
    fontSize: '28rem',
    color: '#3089dc'
  },
  linkItemText: {
    fontSize: '36rem',
    color: '#EB7E10'
  }
};

render(<App />);
