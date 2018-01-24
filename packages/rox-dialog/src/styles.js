
const BORDER_RADIUS = 12;
const s12 = 48;

var styles = {
  modalStyle: {
    width: 612,
    height: 322,
    paddingTop: s12,
    borderRadius: BORDER_RADIUS,
  },

  body: {
    flex: 1,
    paddingLeft: s12,
    paddingRight: s12,
    // justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    backgroundColor: '#ffffff',
  },

  head: {
    height: 50,
    alignItems: 'left',
    justifyContent: 'center',
  },

  textHead: {
    color: '#333333',
    fontSize: 36,
  },

  tips: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 28,
    lines: 3,
    '-webkit-line-clamp': 3,
    overflow: 'hidden',
    lineHeight: '40rem',
    color: '#60646e',
    textAlign: 'center',
    textOverflow: 'ellipsis'
  },
  footer: {
    borderTopColor: '#dddddd',
    flexDirection: 'row',
    borderTopStyle: 'solid',
    borderTopWidth: 0,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonConfirm: {
    flex: 1,
    borderWidth: 0
  },
  buttonAlert: {
    flex: 1,
    borderRadius: 0,
    color: '#333333',
    borderWidth: 0,
    borderTopWidth: 1,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  }
};
export default styles;