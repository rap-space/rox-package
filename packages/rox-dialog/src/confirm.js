import { createElement, Component, render, PropTypes } from 'rax';
import Dialog from './dialog';
import Button from 'rox-button';
import ScrollView from 'rox-scrollview';
import View from 'rox-view';
import Text from 'rox-text';

import styles from './styles';

const DURATION_TIME = 1000;
const BORDER_RADIUS = 12;
class Confirm extends Component {
  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  hide(type) {
    let { onOk, onCancel } = this.props;
    if (type == 'ok' && 　onOk) {
      onOk();
      this.refs.confirm.hide();
    } else if (type == 'cancel' && onCancel) {
      onCancel();
      this.refs.confirm.hide();
    }
    this.refs.confirm.hide();
  }

  show() {
    this.refs.confirm.show();
  }

  render() {
    let { okText, cancelText, titleText, disabledTitle, contentStyle = {} } = this.props;
    return (
      <Dialog ref="confirm"
        disabledTitle={disabledTitle}
        titleText={titleText}
        contentStyle={contentStyle}
        buttons={[
          <Button style={[styles.buttonConfirm, {
            color: '#333333',
            borderTopWidth: 1,
            borderBottomLeftRadius: BORDER_RADIUS,
          }]} type="normal" size="large" onPress={() => {
            this.hide('cancel');
          }}>{cancelText}</Button>,
          <Button style={[styles.buttonConfirm, {
            color: '#ffffff',
            borderRadius: 0,
            borderBottomRightRadius: BORDER_RADIUS,
          }]} type="primary" size="large" onPress={() => {
            this.hide('ok');
          }}>{okText}</Button>
        ]}
      >
        {this.props.children}
      </Dialog>);
  }
}
Confirm.displayName = 'Alert';

Confirm.defaultProps = {
  okText: '确认',
  cancelText: '取消',
  titleText: '温馨提示'
};
Confirm.propTypes = {
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  titleText: PropTypes.string
};
export default Confirm;