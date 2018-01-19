import { createElement, Component, render } from 'rax';
import View from 'nuke-view';
import Text from 'nuke-text';
import Image from 'nuke-image';
import Touchable from 'nuke-touchable';
import Slip from 'nuke-slip';
import { connectStyle } from 'nuke-theme-provider';

import styles from '../styles';

class MenuList extends Component {
  static defaultProps = {
    dataSource: [],
    selected: [],
    onSelect: (index, item, dataSource) => {
      console.warn('Menu onSelect is null. Please set onSelect property on Menu Component. Available params: ', index, item, dataSource);
    },
  }

  isSelected = (item, index) => {
    const { selected } = this.props;

    if (typeof selected === 'function') {
      return selected(item, index);
    }

    return selected.findIndex(i => i === index) !== -1;
  }

  _onSelect = (index, item, dataSource) => {
    const { onSelect } = this.props;

    // hooks here
    // ...
    // console.log(index, item, dataSource);

    onSelect(index, item, dataSource);
  }

  renderList = () => {
    const { dataSource, themeStyle } = this.props;

    // dataSource is empty.
    if (dataSource.length === 0) {
      return null;
    }


    return dataSource.map((item, index) => {
      item.iconPosition = item.iconPosition || 'right';
      item.iconSelected = item.iconSelected == undefined ? 'https://gw.alicdn.com/tfs/TB1faL2nv6H8KJjy0FjXXaXepXa-40-40.png' : '';

      if (this.isSelected(item, index)) {
        return (
          <Touchable key={index} style={themeStyle.item} onPress={() => this._onSelect(index, item, dataSource)}>
            {
              item.iconSelected && item.iconPosition === 'left' &&
              <Image source={{ uri: item.iconSelected }} style={themeStyle.icon} />
            }
            <Text style={themeStyle.textActive}>{item.label}</Text>
            {
              item.iconSelected && item.iconPosition === 'right' &&
              <Image source={{ uri: item.iconSelected }} style={themeStyle.icon} />
            }
          </Touchable>
        );
      }

      return (
        <Touchable key={index} style={themeStyle.item} onPress={() => this._onSelect(index, item, dataSource)}>
          {
            item.icon && item.iconPosition === 'left' &&
            <Image source={{ uri: item.icon }} style={themeStyle.icon} />
          }
          <Text style={themeStyle.text}>{item.label}</Text>
          {
            item.icon && item.iconPosition === 'right' &&
            <Image source={{ uri: item.icon }} style={themeStyle.icon} />
          }
        </Touchable>
      );
    });
  }

  render() {
    const { themeStyle } = this.props;
    return (
      <View style={themeStyle.container}>
        { this.renderList() }
      </View>
    );
  }
}

export default connectStyle(styles)(MenuList);
