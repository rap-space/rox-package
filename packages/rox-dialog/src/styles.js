

var styles = {
  modalStyle: {
    width: 612,
    height: 322,
    // padding:'10rem',
    borderRadius: 12,
  },
  body: {
    flex: 1,
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 30,
    // justifyContent: 'center',
    borderRadius: '8rem',
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
    paddingTop: 12,
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
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '94rem'
  },
  dlgBtn: {
    flex: 1,
    borderWidth: 0
  },
  dlgBtnSeperator: {
    color: '#dddddd'
  },
  button: {
    width: '300rem',
    height: '60rem',
    borderWidth: '1rem',
    borderStyle: 'solid',
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
export default styles;