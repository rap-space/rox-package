import { createElement, Component, render } from 'rax';
import Mask from 'rox-mask';
import View from 'rox-view';
import Text from 'rox-text';

// const StyledIcon = connectStyle(stylesProvider)(Icon);
import Image from 'rox-image';
import styles from './styles';


class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { title, image, afterAddon } = this.props;
    return (
      <View style={styles.listItem}>
        <View style={styles.image}>
          {image}
        </View>
        <View style={styles.body}>
          <View style={{flex: 1}}>
            <Text style={styles.listItemTitle}>{title}</Text>
          </View>
          {this.props.children}
          {afterAddon}
        </View>
      </View>
    );
  }

  renderItem() {

  }

  renderItemWidthIcon() {

  }
}
export default List;