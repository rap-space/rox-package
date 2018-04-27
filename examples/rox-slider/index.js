/** @jsx createElement */
import { createElement, Component, render } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'rox-example-page';
// eslint-disable-next-line
import View from 'nuke-view';
// eslint-disable-next-line
import Text from 'nuke-text';
import Image from 'rox-image';
import Button from 'rox-button';
import Slider from 'rox-slider';

const pics = [
  'https://img.alicdn.com/tfs/TB1WOqpSVXXXXbiXFXXXXXXXXXX-820-545.jpg',
  'https://img.alicdn.com/tfs/TB1bjeTSVXXXXacXXXXXXXXXXXX-820-547.jpg',
  'https://img.alicdn.com/tfs/TB10QaMSVXXXXcWXXXXXXXXXXXX-820-546.jpg',
  'https://img.alicdn.com/tfs/TB12UujSVXXXXbAXVXXXXXXXXXX-820-546.jpg'
];

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.state = {
      index: 2
    };
  }

  sliderChange = e => {
    this.setState({ index: e.index });
    console.log(e);
  };
  btnClick() {
    this.refs.Slider.slideTo(this.state.index + 1);
  }
  renderPics() {
    let body = [];
    pics.map((item, index) => {
      body.push(
        <View style={[styles.item]}>
          <Image src={item} style={styles.img} />
        </View>
      );
    });
    return body;
  }
  render() {
    return (
      <RoxStyleProvider>
        <Page title="slider">
          <Page.Intro main={'3s 自动轮播'} />
          <View style={styles.sliderWrap}>
            <Slider
              ref="Slider"
              style={styles.slider}
              width={700}
              height={465}
              autoplay={true}
              showsPagination={true}
              loop={true}
              index={this.state.index}
              autoplayTimeout="3000"
              paginationStyle={styles.paginationStyle}
              onChange={this.sliderChange}
            >
              {this.renderPics()}
            </Slider>
          </View>
          <View style={styles.btns}>
            <Button
              style={styles.btn}
              block
              type="primary"
              onPress={() => this.btnClick()}
            >
              切换
            </Button>
          </View>
        </Page>
      </RoxStyleProvider>
    );
  }
};
const styles = {
  sliderWrap: {
    padding: 25
  },
  slider: {
    overflow: 'hidden'
  },
  item: {
    width: 700,
    height: 465
  },

  paginationStyle: {
    position: 'absolute',
    width: 700,
    height: 100,
    left: 0,
    bottom: 0,
    color: 'rgba(255, 255, 255 ,0.5)',
    itemColor: '#ffffff',
    itemSelectedColor: '#f1f1f1'
  },
  btns: {
    margin: '30rem'
  },
  btn: {
    marginBottom: '30rem'
  },
  img: {
    width: 700,
    height: 465
  }
};

render(<App />);
