/** @jsx createElement */

import { createElement, Component, findDOMNode, PropTypes } from 'rax';
import Text from 'rox-text';
import Image from 'nuke-image';
import TouchableHighlight from 'nuke-touchable';
import styles from './style';
import Constant from './Constant';

const ITEM_REF = 'itemContainer';

class IconItem extends Component {
  static contextTypes = {
    tabheader: PropTypes.object
  };

  /**
   * 初始化每个Item的样式
   */
  initStyle() {
    const {
      itemWidth = 0,
      margin = 0
    } = this.props;

    let itemStyle = {};
    if (itemWidth) {
      itemStyle.width = itemWidth;
    } else if (margin) {
      itemStyle.marginLeft = margin;
    }

    return itemStyle;
  }

  initIconStyle() {
    const {
      iconWidth = 72,
      iconHeight = 72
    } = this.props;
    let iconStyle = {
      width: iconWidth,
      height: iconHeight
    };

    return iconStyle;
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
    let iconStyle = this.initIconStyle();
    const {index, iconItem, selectIndex, fontSize = 28, iconTextMargin, selectTextColor = '#FF7300', defaultTextColor = Constant.DEFAULT_TEXT_COLOR, defaultTextStyle = {}, selectTextStyle = {}} = this.props;
    let imgUrl, textColor, textStyle;
    if (selectIndex == index) {
      imgUrl = iconItem.selectIconUrl;
      textColor = selectTextColor;
      textStyle = selectTextStyle;
    } else {
      imgUrl = iconItem.iconUrl;
      textColor = defaultTextColor;
      textStyle = defaultTextStyle;
    }

    return (
      <TouchableHighlight
        style={[styles.itemContainer, itemStyle]}
        ref={ITEM_REF + '_' + index}
        onPress={() => {
          if (index != selectIndex) {
            this.select(index, true);
          }
        }}>
        <Image
          source={{ uri: imgUrl }}
          style={iconStyle}
        />
        <Text style={{fontSize: fontSize, marginTop: iconTextMargin, color: textColor, ...textStyle}}>{this.props.dataItem}</Text>
      </TouchableHighlight>
    );
  }
}


export default IconItem;
