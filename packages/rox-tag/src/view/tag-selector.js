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
    selected: false
  };

  render() {
    const { themeStyle, style = {}, selected, children, onClick } = this.props;
    const tagStyle = Object.assign({}, selected ? themeStyle.selected : themeStyle.normal, style);

    return (
      <View style={tagStyle} onClick={onClick}>
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
    defaultValue: T.any,
    value: T.any,
    onChange: T.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: typeof props.value === 'undefined' ? props.defaultValue : props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (typeof this.props.defaultValue === 'undefined' && nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  handleClick = val => e => {
    this.props.onChange(val);

    if (typeof this.props.value === 'undefined') {
      this.setState({
        value: val
      });
    }
  }

  render() {
    const baseStyle = {
      flexDirection: 'row'
    };
    const { style = {}, dataSource = [], type } = this.props;
    const { value } = this.state;

    return (
      <View style={Object.assign({}, selectorStyles, style)}>
        {dataSource.map((val, i) => {
          const label = val.label;
          const selected = value === val.value;

          return (
            <StyledTagItem onClick={this.handleClick(val.value)} style={{ marginRight: i === dataSource.length - 1 ? 0 : Core.s2 }}
              type={type} selected={selected}>{label}</StyledTagItem>
          );
        })}
      </View>
    );
  }
}

export default TagSelector;
