import { createElement, render, Component } from 'rax';
import { ThemeProvider, Emotion } from 'rox-components';
import Page from 'rox-example-page';

let App = class NukeDemoIndex extends Component {
  render() {
    return (
      <ThemeProvider>
        <Page title={'图标类型'}>
          <Page.Intro main="type: 404" />
          <Emotion type="404" text={'您访问的页面找不到了'} buttonText={'回到首页'} />
          <Page.Intro main="type: order" />
          <Emotion type="order" height="500" />
          <Page.Intro main="type: redpack" />
          <Emotion type="redpack" height="500" />
          <Page.Intro main="type: purchaselist" />
          <Emotion type="purchaselist" height="500" />
          <Page.Intro main="type: comment" />
          <Emotion type="comment" height="500" />
          <Page.Intro main="type: collect" />
          <Emotion type="collect" height="500" />
          <Page.Intro main="type: search" />
          <Emotion type="search" height="500" />
          <Page.Intro main="type: commonEmpty" />
          <Emotion type="commonEmpty" height="500" />
          <Page.Intro main="type: wangwang" />
          <Emotion type="wangwang" height="500" />
          <Page.Intro main="type: connectError" />
          <Emotion type="connectError" height="500" />
          <Page.Intro main="type: noNetwork" />
          <Emotion type="noNetwork" height="500" />
          <Page.Intro main="type: coupon" />
          <Emotion type="coupon" height="500" />
          <Page.Intro main="type: paySuccess" />
          <Emotion type="paySuccess" height="500" />
          <Page.Intro main="type: payProcessing" />
          <Emotion type="payProcessing" height="700" />
          <Page.Intro main={'绑定事件'} />
          <Emotion type="404" feedbackText={'出错了'} btnText={'我知道了'} onPress={() => {
            alert('press');
          }} jumpText={'去首页看看'} jumpLink="http://m.1688.com/" />
        </Page>
      </ThemeProvider>
    );
  }
};

render(<App />);
