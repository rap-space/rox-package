import { createElement, render, Component } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Button from 'rox-button';
import Empty from 'rox-emotion';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';
import Image from 'rox-image';
import Text from 'rox-text';

let App = class NukeDemoIndex extends Component {
  render() {
    return (
      <RoxStyleProvider>
        <Page title="图标类型">
          <Page.Intro main="type: 404" />
          <Empty type="404" height="500" />
          <Page.Intro main="type: order" />
          <Empty type="order" height="500" />
          <Page.Intro main="type: redpack" />
          <Empty type="redpack" height="500" />
          <Page.Intro main="type: purchaselist" />
          <Empty type="purchaselist" height="500" />
          <Page.Intro main="type: comment" />
          <Empty type="comment" height="500" />
          <Page.Intro main="type: collect" />
          <Empty type="collect" height="500" />
          <Page.Intro main="type: search" />
          <Empty type="search" height="500" />
          <Page.Intro main="type: commonEmpty" />
          <Empty type="commonEmpty" height="500" />
          <Page.Intro main="type: wangwang" />
          <Empty type="wangwang" height="500" />
          <Page.Intro main="type: connectError" />
          <Empty type="connectError" height="500" />
          <Page.Intro main="type: noNetwork" />
          <Empty type="noNetwork" height="500" />
          <Page.Intro main="type: coupon" />
          <Empty type="coupon" height="500" />
          <Page.Intro main="type: paySuccess" />
          <Empty type="paySuccess" height="500" />
          <Page.Intro main="type: payProcessing" />
          <Empty type="payProcessing" height="500" />
          <Page.Intro main="绑定事件" />
          <Empty type="404" feedbackText="出错了" btnText="我知道了" onPress={() => {alert('press')}} jumpText="去首页看看" jumpLink="http://m.1688.com/" />
        </Page>
      </RoxStyleProvider>
    );
  }
};

const styles = {
  
};
render(<App />);
