/** @jsx createElement */

import { createElement, Component, findDOMNode, PropTypes } from 'rax';
import View from 'rox-view';
import styles from './style';
import Constant from './Constant';
import ItemList from './ItemList';
import DropDown from './DropDown';
import {mixinEmitter} from './Emitter';

class TabHeader extends Component {
  static childContextTypes = {
    tabheader: PropTypes.object,
  };

  getChildContext() {
    return {
      tabheader: this,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      // 默认选中第一个
      selectIndex: this.props.initIndex,
      widthList: [...Array(this.props.dataSource.length)].map(_ => 0)
    };
  }


  componentWillMount() {
    let tabheader = this;
    if (tabheader && tabheader.on) {
      tabheader.on(Constant.TABEHEADER_GOTOP, () => {
        let dom = require('@weex-module/dom');
        dom.scrollToElement(findDOMNode(this.refs[Constant.CONTAINER_REF]), {offset: 0});
      });
    }
  }

  componentDidMount() {
    this.selectIndex(this.state.selectIndex);
  }

  setItemWidth(width, index) {
    let widthList = this.state.widthList;
    widthList[index] = width;
  }

  selectIndex(index) {
    this.emit(Constant.TABEHEADER_SELECT, index);
    this.emit(Constant.TABEHEADER_SCTOLLTO, {
      x: parseInt(this.props.itemWidth) * index,
      index: index,
      itemWidth: this.props.itemWidth
    });

    if (index == this.state.selectIndex) {
      return;
    }

    this.setState({
      selectIndex: index
    });

    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
  }

  /**
   * 初始化容器样式
   */
  initTabheaderStyle() {
    let {height = 80, backgroundColor = '#ffffff'} = this.props;
    return {
      ...styles.container,
      height: height,
      backgroundColor: backgroundColor,
    };
  }


  render() {
    let tabheaderStyle = this.initTabheaderStyle();
    return (
      <View ref={Constant.CONTAINER_REF} style={tabheaderStyle}>
        <DropDown {...this.props} selectIndex={this.state.selectIndex} />
        <ItemList {...this.props} selectIndex={this.state.selectIndex} tabheaderStyle={tabheaderStyle} />
      </View>
    );
  }
}

// TabHeader
mixinEmitter(TabHeader);

export default TabHeader;
