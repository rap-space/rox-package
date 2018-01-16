import { createElement, PureComponent, PropTypes as T, cloneElement } from 'rax';
import { connectStyle } from 'nuke-theme-provider';
import View from 'rox-view';
import Text from 'rox-text';
import styles from '../styles';

class TagItem extends PureComponent {
  static propTypes = {
    type: T.oneOf(['primary', 'normal'])
  };

  static defaultProps = {
    type: 'normal'
  };

  render() {
    const { themeStyle, style = {}, type, children } = this.props;
    const tagStyle = Object.assign({}, themeStyle[type], style);

    return (
      <View style={tagStyle}>
        {typeof children === 'string' ? (
          <Text style={{ color: tagStyle.color, fontSize: tagStyle.fontSize }}>{children}</Text>
        ) :
          children
        }
      </View>
    );
  }
}

const StyledTag = connectStyle(styles)(TagItem);

export class TagList extends PureComponent {
  render() {
    const baseStyle = {
      flexDirection: 'row'
    };
    const { style = {}, dataSource = [], type } = this.props;

    let children = this.props.children;
    if (!Array.isArray(children)) {
      children = [ children ];
    }

    return (
      <View style={Object.assign({}, baseStyle, style)}>
        {dataSource.map((val, i) => {
          return <StyledTag style={{ marginRight: i === dataSource.length - 1 ? 0 : 4 }} type={type}>{val}</StyledTag>;
        })}
      </View>
    );
  }
}

export default StyledTag;
