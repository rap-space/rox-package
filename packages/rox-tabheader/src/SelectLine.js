/** @jsx createElement */

import { createElement, Component, PropTypes, findDOMNode } from 'rax';
import View from 'rox-view';
import styles from './style';
import Animated from './Animation';
import Constant from './Constant';

class SelectLine extends Component {
  static contextTypes = {
    tabheader: PropTypes.object
  };

  componentWillMount() {
    let tabheader = this.context.tabheader;
    if (tabheader && tabheader.on) {
      tabheader.on(Constant.TABEHEADER_SCTOLLTO, (options) => {
        this.lineScrollTo(options);
      });
    }
  }

  lineScrollTo = (options) => {
    let selectLine = findDOMNode(this.refs[Constant.SELECT_LINE_REF]);
    Animated.scrollTo(selectLine, options);
  }


  initStyle() {
    const {dataSource, tabheaderStyle, selectLineColor = '#FF7300'} = this.props;
    styles.selectLine.height = this.props.selectLineHeight || Constant.LINE_HEIGHT;
    let selectLineStyle = {
      ...styles.selectLine,
      width: this.props.selectLineWidth || this.props.itemWidth,
      left: this.props.selectLineWidth ? this.props.itemWidth / 2 - this.props.selectLineWidth / 2 : 0,
      backgroundColor: selectLineColor,
      top: tabheaderStyle.height - styles.selectLine.height
    };

    return selectLineStyle;
  }

  render() {
    let selectLineStyle = this.initStyle();
    return (
      <View style={selectLineStyle} ref={Constant.SELECT_LINE_REF} />
    );
  }
}

export default SelectLine;
