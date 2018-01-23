import { createElement, PureComponent, Component } from 'rax';
import { connectStyle } from 'nuke-theme-provider';
import View from 'rox-view';
import Text from 'rox-text';
import Touchable from 'rox-touchable';
import Icon from 'rox-icon';

import styles from '../styles';

class MenuList extends PureComponent {
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
    const { dataSource, themeStyle = {} } = this.props;

    // dataSource is empty.
    if (dataSource.length === 0) {
      return null;
    }

    return dataSource.map((item, index) => {
      if (this.isSelected(item, index)) {
        return (
          <Touchable style={themeStyle.item} onPress={() => this._onSelect(index, item, dataSource)}>
            <Text style={themeStyle.textActive}>{item.label}</Text>
            <Icon style={themeStyle.icon} name={'check'} type="iconfont" />
          </Touchable>
        );
      }

      return (
        <Touchable style={themeStyle.item} onPress={() => this._onSelect(index, item, dataSource)}>
          <Text style={themeStyle.text}>{item.label}</Text>
        </Touchable>
      );
    });
  }

  render() {
    const { themeStyle = {} } = this.props;
    return (
      <View style={themeStyle.container}>
        { this.renderList() }
      </View>
    );
  }
}

export default connectStyle(styles)(MenuList);
