
const BORDER_RADIUS = 12;
const BODY_PADDING = 48;
const HEAD_HEIGHT = 44;
const headFontSize = 36;
var styles = {
  modalStyle: {
    width: 612,
    minHeight: 332,
    borderRadius: BORDER_RADIUS
  },

  body: {
    flex: 1,
    paddingLeft: BODY_PADDING,
    paddingRight: BODY_PADDING,
    paddingTop: BODY_PADDING,
    paddingBottom: BODY_PADDING,

    // justifyContent: 'center',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  },

  head: {
    height: HEAD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textHead: {
    color: '#333333',
    fontSize: headFontSize,
    height: HEAD_HEIGHT,
    lineHeight: HEAD_HEIGHT,
    overflow: 'hidden',
  },

  content: {
    // minHeight: 96,
    height: 112,
    maxHeight: 600,
    marginTop: 24,
    // borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentText: {
    // borderWidth: 1,
    fontSize: 28,
    lines: 5,
    '-webkit-line-clamp': 5,
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
    borderRadius: 0,
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