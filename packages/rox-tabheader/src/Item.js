/** @jsx createElement */

import { createElement, Component, findDOMNode, PropTypes } from 'rax';
import Text from 'rox-text';
import TouchableHighlight from 'nuke-touchable';
import {isWeex} from 'universal-env';
import Constant from './Constant';
import styles from './style';

const ITEM_REF = 'itemContainer';

class Item extends Component {
  static contextTypes = {
    tabheader: PropTypes.object
  };

  /**
   * 初始化每个Item的样式
   */
  initStyle() {
    // itemWidth为0自适应文字宽度,非0表述固定宽度
    const {
      itemWidth = 0,
      margin = 0,
      fontSize = 28,
    } = this.props;

    let itemStyle = {};
    if (itemWidth) {
      itemStyle.width = itemWidth;
    } else if (margin) {
      itemStyle.marginLeft = margin;
    }
    itemStyle.fontSize = fontSize;


    return itemStyle;
  }

  getWidth = (ref) => {
    let node = findDOMNode(this.refs[ref]);
    const tabheader = this.context.tabheader;
    if (isWeex) {
      let dom = require('@weex-module/dom');
      dom.getComponentRect(node.ref, (e) => {
        tabheader.setItemWidth(e.size.width, this.props.index);
        console.log(e.size.width);
      });
    } else {
      console.log(node.offsetWidth);
      tabheader.setItemWidth(node.offsetWidth, this.props.index);
    }
  }


  componentDidMount() {
    // setTimeout(() => {
    //   this.getWidth(ITEM_REF + '_' + this.props.index);
    // }, 100);
  }

  /**
   * 选中Item
   * @param {*} index
   */
  select(index) {
    const tabheader = this.context.tabheader;
    if (tabheader) {
      tabheader.selectIndex(index);
    }
  }

  render() {
    let itemStyle = this.initStyle();
    const {index, selectTextColor = '#FF7300', selectIndex, defaultTextColor = Constant.DEFAULT_TEXT_COLOR, defaultTextStyle = {}, selectTextStyle = {}} = this.props;
    let imgUrl, textColor, textStyle;

    if (selectIndex == index) {
      textColor = selectTextColor;
      textStyle = selectTextStyle;
    } else {
      textColor = defaultTextColor;
      textStyle = defaultTextStyle;
    }

    return (
      <TouchableHighlight
        style={[styles.itemContainer, itemStyle]}
        ref={ITEM_REF + '_' + index}
        onPress={() => {
          this.select(index, true);
        }}>
        <Text style={{fontSize: itemStyle.fontSize, color: textColor, textOverflow: 'ellipsis', width: itemStyle.width, textAlign: 'center', ...textStyle}} numberOfLines={1}>{this.props.dataItem}</Text>
      </TouchableHighlight>
    );
  }
}


export default Item;
