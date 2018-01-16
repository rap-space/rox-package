import { createElement, Component, render } from 'rax';
import View from 'nuke-view';
import Text from 'nuke-text';
import Image from 'nuke-image';
import Touchable from 'nuke-touchable';
import Slip from 'nuke-slip';

class MenuList extends Component {
  static defaultProps = {
    dataSource: [],
    selected: [],
    onSelect: () => {
      console.warn('Menu onSelect is null');
    },
  }

  isSelected = (item, index) => {
    const { selected } = this.props;

    if (typeof selected === 'function') {
      return selected(item, index);
    }

    return selected.findIndex(i => i === index) !== -1;
  }

  render() {
    const { dataSource, styleText, styleTextActive, styleIcon } = this.props;

    // dataSource is empty.
    if (dataSource.length === 0) {
      return null;
    }


    return dataSource.map((item, index) => {
      item.position = item.position || 'right';
      item.iconSelected = item.iconSelected || 'https://gw.alicdn.com/tfs/TB1q.k4kyqAXuNjy1XdXXaYcVXa-40-28.png';

      if (this.isSelected(item, index)) {
        return (
          <Touchable style={styles.itemGroup} onPress={() => this._onSelect(index, item, dataSource)}>
            {
              item.iconSelected && item.position === 'left' && <Image source={{ uri: item.iconSelected }} style={{...styles.checkIcon, ...styleIcon}} />
            }
            <Text style={{...styles.defaultStyleText, ...styles.defaultStyleTextActive, ...styleTextActive}}>{item.label}</Text>
            {
              item.iconSelected && item.position === 'right' && <Image source={{ uri: item.iconSelected }} style={{...styles.checkIcon, ...styleIcon}} />
            }
          </Touchable>
        );
      }

      return (
        <Touchable style={styles.itemGroup} onPress={() => this._onSelect(index, item, dataSource)}>
          {
            item.icon && item.position === 'left' && <Image source={{ uri: item.icon }} style={{...styles.checkIcon, ...styleIcon}} />
          }
          <Text style={{...styles.defaultStyleText, ...styleText}}>{item.label}</Text>
          {
            item.icon && item.position === 'right' && <Image source={{ uri: item.icon }} style={{...styles.checkIcon, ...styleIcon}} />
          }
        </Touchable>
      );
    });
  }
}

var styles = {
  textGroup: {
    flexDirection: 'row',
    position: 'relative',
    padding: 0,
    minHeight: '71px'
  },
  menuGroup: {
    height: 96,
    backgroundColor: 'rgba(255,255,255,1)',
    flexDirection: 'row',
    paddingLeft: 32,
    paddingRight: 32,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemsGroup: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'column',
  },
  itemGroup: {
    height: 96,
    backgroundColor: 'rgba(255,255,255,1)',
    flexDirection: 'row',
    borderTopColor: 'rgba(229,229,229,1)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    paddingLeft: 32,
    paddingRight: 32,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageGroup: {
    padding: 0,
    marginTop: 27,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 32,
    paddingRight: 33
  },
  defaultStyleText: {
    fontSize: 32,
    color: '#333333',
    lineHeight: 40,
    lines: 1,
    fontWeight: 400,
    flex: 1,
  },
  defaultStyleTextActive: {
    color: '#FF6000',
  },
  checkIcon: {
    width: 20,
    height: 13,
  },
  borderTop: {
    width: 750,
    height: 1,
    backgroundColor: 'rgba(229,229,229,1)',
    flexDirection: 'row'
  },
  itemText: {
    fontSize: 32,
    color: '#333333',
    lineHeight: 40,
    lines: 1,
    fontWeight: 400,
    flexDirection: 'row',
    flex: 1,
  },
  menuText: {
    fontSize: 32,
    color: '#FF6000',
    lineHeight: 45,
    lines: 1,
    fontWeight: 400,
  },
};

export default MenuList;
