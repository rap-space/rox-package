import { createElement, PureComponent, PropTypes as T, cloneElement } from 'rax';
import { connectStyle } from 'nuke-theme-provider';
import View from 'rox-view';
import Text from 'rox-text';
import styles from '../styles';

class TagItem extends PureComponent {
  static propTypes = {
    selected: T.bool
  };

  static defaultProps = {

  };

  render() {
    const { themeStyle, style = {}, children } = this.props;
    const tagStyle = Object.assign({}, themeStyle, style);

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

const StyledTagItem = connectStyle(styles)(TagItem);

const selectorStyles = {
  paddingLeft: 0
};

export class TagSelector extends PureComponent {
  static propTypes = {
    dataSource: T.arrayOf(T.shape({
      label: T.node,
      value: T.any
    }))
  }

  render() {
    const baseStyle = {
      flexDirection: 'row'
    };
    const { style = {}, dataSource = [], type } = this.props;

    return (
      <View style={selectorStyles}>
        {dataSource.map((val, i) => {
          return <StyledTagItem style={{ marginRight: i === dataSource.length - 1 ? 0 : 4 }} type={type}>{val}</StyledTagItem>;
        })}
      </View>
    );
  }
}

export default TagSelector;
