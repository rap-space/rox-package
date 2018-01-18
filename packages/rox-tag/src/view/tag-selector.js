import { createElement, PureComponent, PropTypes as T, cloneElement } from 'rax';
import { connectStyle } from 'nuke-theme-provider';
import { Core } from 'rox-theme';
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
    const tagStyle = Object.assign({}, themeStyle.normal, style);

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
  paddingLeft: 0,
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap'
};

export class TagSelector extends PureComponent {
  static propTypes = {
    dataSource: T.arrayOf(T.shape({
      label: T.node,
      value: T.any
    })),
    value: T.any,
    onChange: T.func
  }

  render() {
    const baseStyle = {
      flexDirection: 'row'
    };
    const { style = {}, dataSource = [], type } = this.props;

    return (
      <View style={Object.assign({}, selectorStyles, style)}>
        {dataSource.map((val, i) => {
          const label = val.label;
          return <StyledTagItem style={{ marginRight: i === dataSource.length - 1 ? 0 : Core.s2 }} type={type}>{label}</StyledTagItem>;
        })}
      </View>
    );
  }
}

export default TagSelector;
