/** @jsx createElement */
import {createElement, Component,render} from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
import Web from 'rox-web';

let App = class NukeDemoIndex extends Component {
    constructor() {
        super();
    }

    render() {
        return (
          <RoxStyleProvider>
            <Page title="Web">
                <Page.Intro main="使用 web 组件载入 m.taobao.com"></Page.Intro>
                <Web style={{width:'700rem',height:'500rem',padding:'25rem'}} src="https://m.taobao.com"></Web>
            </Page>
          </RoxStyleProvider>
        );
    }
}

render(<App/>);