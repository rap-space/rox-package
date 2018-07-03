import { createElement, Component, PropTypes, render } from 'rax';

import View from 'rox-view';
import Text from 'rox-text';
import Icon from 'rox-icon';
import Link from 'rox-link';
import Image from 'rox-image';

import styles from './styles';

class List extends Component {
  static defaultProps = {
    type: 'normal', // href select normal
    href: 'https://www.1688.com',
    thumbHeight: 30,
    thumb: '',
    titleAfterEle: '',
    title: '标题',
    brief: '',
    rightEle: '',
    hasBorder: true,
    clickHandle: '',
    isSelect: false,
    disabled: false
  };

  constructor(props) {
    super(props);

    this.state = {
      isSelect: props.isSelect
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev) {
    let { clickHandle, disabled } = this.props;
    let { isSelect } = this.state;

    if (disabled) {
      return;
    }

    this.setState({
      isSelect: !isSelect
    });

    if (clickHandle && typeof clickHandle === 'function') {
      this.props.clickHandle(ev, this.props);
    }
  }

  renderRight() {
    const { type, rightEle } = this.props;
    const { isSelect } = this.state;

    let iconName = '';
    if (type === 'href') {
      iconName = 'right';
    } else if (type === 'select') {
      iconName = isSelect ? 'check_selected' : 'check_normal';
    }

    if (type === 'href' || type === 'select') {
      return rightEle ? (
        <View>
          {typeof rightEle === 'string' ? (
            <View>
              <Text style={styles.rightText}>{rightEle}</Text>
              <Icon style={{...styles.rightIcon, color: isSelect && type === 'select' ? '#ff6000' : '#999999' }} name={iconName} type="iconfont" />
            </View>
          ).props.children : rightEle}
        </View>
      ).props.children : <Icon style={{...styles.rightIcon, color: isSelect && type === 'select' ? '#ff6000' : '#999999' }} name={iconName} type="iconfont" />;
    } else {
      return rightEle ? (
        <View>
          {typeof rightEle === 'string' ? <Text style={styles.rightText}>{rightEle}</Text> : rightEle}
        </View>
      ).props.children : null;
    }
  }

  render() {
    let {
      title,
      titleAfterEle,
      thumb,
      brief,
      href,
      type,
      thumbHeight,
      hasBorder,
      disabled
    } = this.props;

    thumbHeight = thumbHeight ? thumbHeight * 2 : 30;

    const CellComponent = href && type === 'href' && !disabled ? Link : View;


    return (
      <CellComponent
        style={styles.listItem}
        href={href && type === 'href' ? href : ''}
        onClick={this.handleClick}
      >
        {/* 左侧图片,支持url和ele */}
        {thumb ? (
          <View
            style={styles.thumbWrap}
          >
            {typeof thumb === 'string' ? <Image style={{...styles.thumb, height: thumbHeight, width: thumbHeight}} src={thumb} /> : thumb}
          </View>
        ) : null}

        <View
          style={{
            ...styles.listBody,
            borderBottomWidth: hasBorder ? 1 : 0,
          }}
        >
          <View style={styles.bodyLeft}>
            {/* title and tile afterEle */}
            <View style={styles.titleWrap}>
              <Text
                style={{...styles.titleText, color: disabled ? '#999999' : '#333333'}}
              >
                {title}
              </Text>
              { titleAfterEle && titleAfterEle }
            </View>

            {/* 副标题, 支持字符串跟ele */}
            {brief ? (
              <View style={styles.briefWrap}>
                {typeof brief === 'string' ? <Text style={styles.briefText}>{brief}</Text> : brief}
              </View>
            ) : null}
          </View>
          <View style={styles.bodyRight}>
            {/* 右侧内容区域 */}
            { this.renderRight()}
          </View>
        </View>
      </CellComponent>
    );
  }
}
export default List;