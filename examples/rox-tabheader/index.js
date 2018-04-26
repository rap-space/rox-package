import { createElement, render, Component } from 'rax';
// eslint-disable-next-line
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from '../rox-example-page';
// eslint-disable-next-line
import View from 'rox-view';
import Image from 'rox-image';
import Tabheader from 'rox-tabheader';
import RoxStyleProvider from 'rox-theme-provider';

let App = class NukeDemoIndex extends Component {
  state = {
    showSnackBar: false,
    showSnackBar1: false
  };
  constructor() {
    super();
    this.closeHandler = this.closeHandler.bind(this);
    this.showBar = this.showBar.bind(this);
    this.showBar1 = this.showBar1.bind(this);
  }

  showBar() {
    this.setState({
      showSnackBar: true
    });
  }

  showBar1() {
    this.setState({
      showSnackBar1: true
    });
  }

  closeHandler() {
    this.setState({
      showSnackBar: false
    });
  }

  hideBar() {}

  render() {
    return (
      <RoxStyleProvider>
        <Page title="tabheader">
          <Page.Intro main={'normal模式'} />
          <Tabheader
            dataSource={[
              '测试1',
              '测试233测试233',
              '测试测试1',
              '测试1',
              '测试测试1',
              '测试rr',
              '测试1',
              '测试1'
            ]}
            initIndex={0}
            height={80}
            itemWidth={144}
            type={'normal'}
            isDrop={false}
            fontSize={28}
            selectTextColor={'#FF7300'}
            selectLineColor={'#000'}
            dropTitle={'选择类目类目'}
            dropSelectColor={'#ff30f0'}
            isShowSelectLine={true}
            onSelect={(index) => console.log(index)}
          />

          <Page.Intro main={'icon模式'} />
          <Tabheader
            dataSource={[
              '测试1',
              '测试233',
              '测试测试1',
              '测试1',
              '测试测试1',
              '测试rr',
              '测试1',
              '测试1'
            ]}
            initIndex={3}
            height={150}
            itemWidth={144}
            type={'icon'}
            isDrop={false}
            fontSize={28}
            defaultTextColor={'#fff000'}
            selectTextColor={'#FF7300'}
            dropTitle={'选择类目类目'}
            isShowSelectLine={true}
            iconWidth={72}
            iconHeight={72}
            iconTextMargin={10}
            iconList={[
              {
                iconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/044/190/3091440_1625054590.png',
                selectIconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/365/380/3083563_1625054590.png'
              },
              {
                iconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/894/980/3089498_1625054590.png',
                selectIconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/934/190/3091439_1625054590.png'
              },
              {
                iconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/044/190/3091440_1625054590.png',
                selectIconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/365/380/3083563_1625054590.png'
              },
              {
                iconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/894/980/3089498_1625054590.png',
                selectIconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/934/190/3091439_1625054590.png'
              },
              {
                iconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/044/190/3091440_1625054590.png',
                selectIconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/365/380/3083563_1625054590.png'
              },
              {
                iconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/894/980/3089498_1625054590.png',
                selectIconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/934/190/3091439_1625054590.png'
              },
              {
                iconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/044/190/3091440_1625054590.png',
                selectIconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/365/380/3083563_1625054590.png'
              },
              {
                iconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/894/980/3089498_1625054590.png',
                selectIconUrl:
                  'https://cbu01.alicdn.com/cms/upload/2017/934/190/3091439_1625054590.png'
              }
            ]}
            onSelect={(index) => console.log(index)}
          />
        </Page>
      </RoxStyleProvider>
    );
  }
};

render(<App />);
