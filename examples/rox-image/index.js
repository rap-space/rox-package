/** @jsx createElement */
import {createElement, Component, render} from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from '../../packages/rox-example-componet/rox-example-page';
// eslint-disable-next-line
import View from 'nuke-view';
// eslint-disable-next-line
import Text from 'nuke-text';
import Image from 'rox-image';

class ImageDemo extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          src: 'http://img.alicdn.com/tps/TB1SrmcOVXXXXXFXpXXXXXXXXXX-520-280.jpg',
          autoFit: true
        }, {
          src: 'http://img.alicdn.com/tfs/TB1xCFCPVXXXXchXXXXXXXXXXXX-160-160.gif',
          autoFit: true
        }, {
          src: 'https://ubanner.alicdn.com/7857/4348/7461.png?getAvatar=avatar',
          autoFit: true
        }, {
          src: 'https://gw.alicdn.com/tps/TB12ShfQXXXXXXLapXXXXXXXXXX-1600-380.jpg',
          autoFit: false,
          width: '10rem',
          height: '10rem'
        }
      ]
    };
  }
  imageArrLoadHandler = (index, e) => {
    if (!e.size) return;

    console.log('onload', index, e.size.naturalWidth, e.size.naturalHeight);

    let newData = Object.assign([], this.state.data);
    //  > 600 以 600 为基准
    if (e.size.naturalWidth > 600) {
      newData[index].width = '600rem';
      newData[index].height = Math.round(600 * e.size.naturalHeight / e.size.naturalWidth) + 'rem';
    }
    this.setState({data: newData});
  }

  render() {
    let data = this.state.data;
    return (
      <Page title="Image">
        {data.map((item, index) => {
          return (
            <View style={styles.itemWrapper}>
              <View style={styles.item}>
                <Image
                  ref="testimage"
                  src={item.src}
                  autoFit={item.autoFit}
                  style={[
                    {
                      quality: 'original'
                    },
                    !item.autoFit
                      ? {
                        width: item.width,
                        height: item.height
                      }
                      : {}
                  ]}
                  onLoad={(e) => {
                    this.imageArrLoadHandler(index, e);
                  }} />
              </View>
            </View>
          );
        })}
      </Page>
    );
  }
}
const styles = {
  itemWrapper: {
    margin: '30rem'
  },
  label: {
    fontSize: '28rem'
  },
  item: {
    marginTop: '30rem',
    marginBottom: '30rem',
    borderColor: '#dddddd',
    borderWidth: '1rem',
    borderStyle: 'dashed',
    height: '500rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {}
};

render(<ImageDemo />);
