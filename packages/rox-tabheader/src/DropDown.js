/** @jsx createElement */

import { createElement, Component, findDOMNode, PropTypes } from 'rax';
import View from 'rox-view';
import Text from 'rox-text';
import Image from 'nuke-image';
import TouchableHighlight from 'nuke-touchable';
import { isWeex } from 'universal-env';
import Animated from './Animation';
import styles from './style';
import Constant from './Constant';

/**
 * 下拉组件
 */
class DropDown extends Component {
  static contextTypes = {
    tabheader: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    };
  }

  /**
   * 更改显示状态
   */
  changeShowStatus() {
    if (!this.state.isShow) {
      this.openDropDown();
    } else {
      this.closeDropDown();
    }
    this.setState({
      isShow: !this.state.isShow
    });
  }

  /**
   * 获取下拉容器高度
   */
  getDropContainerHeight() {
    const dataSource = this.props.dataSource;
    let rowsNum = Math.ceil(dataSource.length / 4);
    return Constant.TAB_HEADER_HEIGHT + Constant.DROPITEM_HRIGHT * rowsNum;
  }

  openDropDown() {
    const tabheader = this.context.tabheader;
    // weex下置顶
    if (isWeex) {
      if (tabheader) {
        tabheader.emit(Constant.TABEHEADER_GOTOP);
      }
    }

    if (tabheader) {
      tabheader.emit(Constant.TABEHEADER_HIDE);
    }

    // 旋转icon
    const icon = findDOMNode(this.refs[Constant.DROP_ICON_REF]);
    Animated.rotate(icon, 180);
  }

  closeDropDown() {
    const tabheader = this.context.tabheader;
    if (tabheader) {
      tabheader.emit(Constant.TABEHEADER_SHOW);
    }
    const icon = findDOMNode(this.refs[Constant.DROP_ICON_REF]);
    Animated.rotate(icon, 360);
  }

  selectItem(index) {
    const tabheader = this.context.tabheader;
    if (tabheader) {
      tabheader.selectIndex(index);
    }
    this.changeShowStatus();
  }

  /**
   * 初始化遮罩样式
   */
  initMaskStyle() {
    let maskStyle = {
      backgroundColor: '#000000',
      opacity: 0.1,
      width: 750,
      height: 2000,
      position: 'fixed',
      top: 80,
      left: 0
    };

    if (!isWeex) {
      maskStyle.top = 0;
    }

    return maskStyle;
  }

  render() {
    const { dataSource, selectIndex, dropSelectColor} = this.props;
    if (!this.props.isDrop) {
      return;
    }
    let containerStyle = {}, dropItemContainerStyle = {};
    if (isWeex) {
      dropItemContainerStyle.top = 80;
      dropItemContainerStyle.left = 0;
      dropItemContainerStyle.position = 'fixed';
    }

    let dropDownText = this.props.dropTitle || Constant.DROP_TITLE_DEFAULT;

    return (
      <View style={[styles.dropDownContainer]}>
        {
          this.state.isShow &&
          <TouchableHighlight
            style={this.initMaskStyle()}
            onPress={() => {
              this.changeShowStatus();
            }} />
        }

        <View style={styles.dropTitleContainer}>
          <Text style={styles.dropTitle}>{dropDownText}</Text>
        </View>

        <TouchableHighlight style={styles.dropBtn} onPress={() => {
          this.changeShowStatus();
        }}>
          <Image
            ref={Constant.DROP_ICON_REF}
            source={{ uri: '//gw.alicdn.com/tps/TB1H03wKVXXXXX_aXXXXXXXXXXX-40-40.png' }}
            style={styles.arrowIcon}
          />
        </TouchableHighlight>
        {
          this.state.isShow &&
          <View style={[styles.dropDownItemContainer, dropItemContainerStyle]} ref={Constant.DROP_DOWN_REF}>
            {
              dataSource.map((item, index) => {
                let dropDownItemStyle = [styles.dropDownItem], dropDownItemTextStyle = [styles.dropDownItemText];
                // 选中样式修改
                if (index == selectIndex) {
                  styles.selectDropDownItem.borderColor = dropSelectColor || styles.selectDropDownItem.borderColor;
                  dropDownItemStyle.push(styles.selectDropDownItem);
                  styles.selectDropDownItemText.color = dropSelectColor || styles.selectDropDownItemText.color;
                  dropDownItemTextStyle.push(styles.selectDropDownItemText);
                }
                return (
                  <TouchableHighlight style={dropDownItemStyle} onPress={() => {
                    this.selectItem(index);
                  }} >
                    <Text style={dropDownItemTextStyle} numberOfLines={1}>{item}</Text>
                  </TouchableHighlight>
                );
              })
            }
          </View>
        }
      </View>
    );
  }
}


export default DropDown;
