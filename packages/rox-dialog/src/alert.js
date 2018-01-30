import { createElement, Component, render, PropTypes } from 'rax';
import Dialog from './dialog';
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
    let { okText, titleText, disabledTitle, contentStyle = {} } = this.props;
    return (
      <Dialog ref="alert"
        disabledTitle={disabledTitle}
        titleText={titleText}
        contentStyle={contentStyle}
        buttons={[
          <Button
            style={styles.buttonAlert}
            type="normal"
            size="large"
            onPress={this.hide}>{okText}</Button>
        ]}
      >
        {this.props.children}
      </Dialog>);
  }
}
Alert.displayName = 'Alert';

Alert.defaultProps = {
  okText: '确认',
  titleText: '温馨提示',
  disabledTitle: false
};
Alert.propTypes = {
  okText: PropTypes.string,
  titleText: PropTypes.string,
  disabledTitle: PropTypes.boolean
};
export default Alert;