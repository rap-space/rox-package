/** @jsx createElement */
import { createElement, Component, render } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from '../rox-example-page';
import Web from 'rox-web';

let App = class NukeDemoIndex extends Component {
  render() {
    return (
      <RoxStyleProvider>
        <Page title="Web">
          <Page.Intro main={'使用 web 组件载入 m.taobao.com'} />
          <Web
            style={{ width: '700rem', height: '500rem', padding: '25rem' }}
            src="https://m.taobao.com"
          />
        </Page>
      </RoxStyleProvider>
    );
  }
};

render(<App />);
