import { createElement, Component, render } from 'rax';
import Dialog from 'nuke-dialog';
import Button from 'rox-button';
import ScrollView from 'rox-scrollview';
import View from 'rox-view';
import Text from 'rox-text';

import styles from './styles';

const DURATION_TIME = 1000;
const BORDER_RADIUS = 12;
class Alert extends Component {
  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }
  hide() {
    this.refs.alert.hide();
  }

  show() {
    this.refs.alert.show();
  }

  render() {
    let { okText, titleText, disabledTitle } = this.props;
    titleText = titleText || '温馨提示';
    okText = okText || '确认';
    // onHide = onHide || this.hide;
    return (
      <Dialog ref="alert"
        duration={DURATION_TIME}
        maskClosable={false}
        contentStyle={styles.modalStyle}
      >
        <View style={styles.body}>
          {
            disabledTitle ? null : <View style={styles.head}>
              <Text style={styles.textHead}>{titleText}</Text>
            </View>
          }
          <ScrollView style={styles.tips}>
            <Text style={styles.text}>
              {this.props.children}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Button style={styles.buttonAlert} type="normal" size="large" onPress={this.hide}>{okText}</Button>
        </View>
      </Dialog>);
  }
}

export default Alert;