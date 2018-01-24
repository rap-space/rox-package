/** @jsx createElement */
import { createElement, Component, render } from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';
// eslint-disable-next-line
import Text from 'nuke-text';
import Tabheader from 'rox-tabheader';
import RecyclerView, { Cell, Header} from 'rox-recycler-view';

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          key: 'A',
          bg: '#1170bc',
          color: '#ffffff'
        },
        {
          key: 'B',
          bg: '#3089dc',
          color: '#ffffff'
        },
        {
          key: 'C',
          bg: '#f1f1f1',
          color: '#3d4145'
        },
        {
          key: 'F',
          bg: 'yellow',
          color: '#ffffff'
        },
        {
          key: 'G',
          bg: 'red',
          color: '#ffffff'
        }
      ]
    };
  }
  getViews() {
    let doms = [];
    this.state.data.map((item, index) => {
      doms.push(
        <Cell>
          <View
            style={[
              styles.item,
              {
                backgroundColor: item.bg
              }
            ]}
          >
            <Text
              style={{
                color: item.color
              }}
            >
              {item.key}
            </Text>
          </View>
        </Cell>
      );
    });

    return doms;
  }

  render() {
    return (
      <RecyclerView style={styles.vscroller}>

        <Header>
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
            isDrop={true}
            fontSize={28}
            selectTextColor={'#FF7300'}
            selectLineColor={'#000'}
            dropTitle={'选择类目类目'}
            dropSelectColor={'#ff30f0'}
            isShowSelectLine={true}
            onSelect={(index) => console.log(index)}
          />
        </Header>

        {this.getViews()}
      </RecyclerView>
    );
  }
};

const styles = {
  vscroller: {
    flex: 1
  },
  itemRefresh: {
    width: 750,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    height: '300rem',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

render(<App />);
