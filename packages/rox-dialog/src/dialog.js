import { createElement, Component, render, PropTypes } from 'rax';
import Dialog from 'nuke-dialog';
import Button from 'rox-button';
import ScrollView from 'rox-scrollview';
import View from 'rox-view';
import Text from 'rox-text';

import styles from './styles';

const DURATION_TIME = 1000;
const BORDER_RADIUS = 12;
class CustomDialog extends Component {
  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }
  hide() {
    this.refs.dialog.hide();
  }

  show() {
    this.refs.dialog.show();
  }

  render() {
    let { titleText, disabledTitle, type, contentStyle} = this.props;
    // onHide = onHide || this.hide;
    let dialogContentStyle = styles.modalStyle;

    if (disabledTitle) {
      contentStyle.marginTop = 0;
      dialogContentStyle.minHeight = 312;
      contentStyle.minHeight = 120;
      if (!contentStyle.height || contentStyle.height <= 120) {
        contentStyle.height = 120;
      }
    }
    return (
      <Dialog ref="dialog"
        duration={DURATION_TIME}
        maskClosable={false}
        contentStyle={dialogContentStyle}
      >
        <View style={styles.body}>
          {
            disabledTitle ? null : <View style={styles.head}>
              <Text style={styles.textHead}>{titleText}</Text>
            </View>
          }
          <View style={[styles.content, contentStyle]}>
            <Text style={styles.contentText}>
              {this.props.children}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          {this.props.buttons}
        </View>
      </Dialog>);
  }
}

export default CustomDialog;