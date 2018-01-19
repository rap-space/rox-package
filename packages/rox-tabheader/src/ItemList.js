/** @jsx createElement */

import { createElement, Component, PropTypes } from 'rax';
import ScrollView from 'nuke-scroll-view';
// import Dimensions from '@ali/cox-dimensions';
import styles from './style';
import Constant from './Constant';
import Item from './Item';
import IconItem from './IconItem';
import SelectLine from './SelectLine';
import {isWeex} from 'universal-env';


class ItemList extends Component {
  static contextTypes = {
    tabheader: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      left: 0
    };
  }

  componentWillMount() {
    let tabheader = this.context.tabheader;
    if (tabheader && tabheader.on) {
      tabheader.on(Constant.TABEHEADER_SCTOLLTO, (options) => {
        this.scrollTo(options);
      });

      tabheader.on(Constant.TABEHEADER_HIDE, (options) => {
        this.setState({
          top: -3000
        });
      });

      tabheader.on(Constant.TABEHEADER_SHOW, (options) => {
        this.setState({
          top: 0
        });
      });
    }
  }

  initScrollViewStyle() {
    let scrollviewStyle = styles.scrollviewContainer;
    if (this.props.isDrop) {
      scrollviewStyle.width = 670;
    } else {
      scrollviewStyle.width = 750;
    }

    if (this.props.backgroundColor) {
      scrollviewStyle.backgroundColor = this.props.backgroundColor;
    }
    return scrollviewStyle;
  }

  scrollTo = (options) => {
    // const screenInfo = Dimensions.get('screen');
    // const ratio = isWeex ? screenInfo.width / 750 : screenInfo.width / 375;

    // let screenWidth = 750;
    // let selectedItemOffset = 0;

    // selectedItemOffset = options.index * options.itemWidth;

    // let dist = selectedItemOffset - screenWidth / 2 + options.itemWidth / 2;
    // // @note: weex android下计算误差
    // if (isWeex) {
    //   dist = dist / ratio;
    // }

    // if (dist < 0) {
    //   dist = 0;
    // }

    const {itemWidth, dataSource} = this.props;
    if (dataSource.length * itemWidth < 750) {
      return;
    }

    let xNum = parseInt(options.x) - 300;
    if (isWeex && xNum <= 0) {
      xNum = 0;
    }

    if (this.refs[Constant.SCROLLVIEW_REF]) {
      this.refs[Constant.SCROLLVIEW_REF].scrollTo({x: xNum});
    }
  }

  render() {
    const {dataSource, isShowSelectLine = true, iconList, type} = this.props;

    let normalFlag, iconFlag = false;
    if (type == Constant.TYPE_NORMAL) {
      normalFlag = true;
    } else if (type == Constant.TYPE_ICON) {
      iconFlag = true;
    }

    let scrollviewStyle = this.initScrollViewStyle();

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={[scrollviewStyle, {top: this.state.left}]} ref={Constant.SCROLLVIEW_REF}>
        {
          dataSource.map((item, index) => {
            return (
              [normalFlag && <Item {...this.props} dataItem={item} index={index} />,
                iconFlag && <IconItem {...this.props} dataItem={item} index={index} iconItem={iconList[index]} />
              ]
            );
          })
        }
        {
          isShowSelectLine && <SelectLine {...this.props} />
        }

      </ScrollView>
    );
  }
}

export default ItemList;
