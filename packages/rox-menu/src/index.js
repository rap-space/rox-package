import { createElement, Component, render } from 'rax';
import View from 'nuke-view';
import Text from 'nuke-text';
import Image from 'nuke-image';
import Touchable from 'nuke-touchable';
import Slip from 'nuke-slip';

class Menu extends Component {
  static defaultProps = {
    selectedIndex: 0,
    onSelect: () => {
      console.warn('Menu onSelect is null');
    },
  }

  state = {
    expand: false,
  }

  toggleIt = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    });
  }

  _onSelect = (index, text, list) => {
    const { onSelect, DEBUG } = this.props;

    this.setState({
      expand: false,
    });

    onSelect(index, text, list);
  }

  renderList = () => {
    const { list, style, selectedIndex } = this.props;
    const { expand } = this.state;
    if (!expand) return null;

    return list.map((text, index) => {
      if (index === selectedIndex) {
        return (
          <Touchable style={styles.itemGroup} onPress={() => this._onSelect(index, list[index], list)}>
            <Text style={styles.itemTextActive}>{text}</Text>
            <Image source={{uri: 'https://gw.alicdn.com/tfs/TB1q.k4kyqAXuNjy1XdXXaYcVXa-40-28.png'}} style={styles.checkIcon} />
          </Touchable>
        );
      }

      return (
        <Touchable style={styles.itemGroup} onPress={() => this._onSelect(index, list[index], list)}>
          <Text style={styles.itemText}>{text}</Text>
        </Touchable>
      );
    });
  }

  render() {
    const { list, style, selectedIndex } = this.props;


    if (!list || list && list.length === 0) {
      return null;
    }


    return (
      <View style={style}>
        <Touchable style={styles.menuGroup} onPress={this.toggleIt} >
          <Text style={styles.menuText}>{list[selectedIndex]}</Text>
          <Image source={{uri: 'https://gw.alicdn.com/tfs/TB18yV0m8fH8KJjy1XbXXbLdXXa-24-16.png'}} style={styles.arrowIcon} />
        </Touchable>

        { this.renderList() }
      </View>
    );
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
  itemTextActive: {
    fontSize: 32,
    color: '#FF6000',
    lineHeight: '40rem',
    lines: 1,
    fontWeight: 400,
    flex: 1,
  },
  checkIcon: {
    width: 20,
    height: 13,
    marginTop: 13
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
  arrowIcon: {
    width: 12,
    height: 8,
    marginLeft: 10,
  }
};

export default Menu;
