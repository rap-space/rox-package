/** @jsx createElement */
import { createElement, Component, PropTypes } from 'rax';
import View from 'nuke-view';
import Text from 'nuke-text';


class SnackBar extends Component {
  state = {
    visibile: false
  }
  constructor() {
    super();
  }

  componentWillMount() {
    this.state.visibile = this.props.visibile || false;
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      visibile: nextProps.visibile
    });
  }

  getContent() {
    let maxLines = 1;
    let actionTpl = this.props.actionTpl || null;
    const contentDom = (
      <View style={styles.body}>
        <View style={[styles.textWrap]}>
          <Text fixedFont numberOfLines={maxLines} style={[styles.text]}>
            {this.props.message}
          </Text>
        </View>
        {actionTpl ?
          <View style={styles.action} onClick={() => {
            this.props.onAction && this.props.onAction();
          }}>{actionTpl}</View>
          : null
        }
      </View>
    );

    return contentDom;
  }
  
  render() {
    let tpl = this.state.visibile ? this.getContent() : null;
    return tpl;
  }
}
SnackBar.propTypes = {
  actionText: PropTypes.string,
  message: PropTypes.string
};

SnackBar.defaultProps = {
  actionText: null,
  message: null,
};

const styles = {
  body: {
    width: 750,
    height: 80,
    backgroundColor: '#FFF1E6',
    position: 'fixed',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textWrap: {
    paddingLeft: 24
  },
  text: {
    color: '#666666',
    fontSize: 28
  },
  action: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    position: 'absolute',
    right: 32,
    color: '#666666',
    fontSize: 28
  }

};
SnackBar.displayName = 'SnackBar';

export default SnackBar;
