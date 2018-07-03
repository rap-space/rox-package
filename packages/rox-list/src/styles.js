const styles = {
  listItem: {
    display: 'flex',
    width: 750,
    paddingLeft: 24,
    minHeight: 96,
    flexDirection: 'row',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff'

  },

  // 头像
  thumbWrap: {
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 24
  },

  thumb: {
    marginRight: 20,
    borderRadius: '50%'
  },

  // 内容区域
  listBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flexStart',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    alignSelf: 'stretch',
    paddingTop: 24,
    paddingBottom: 24
  },

  // 内容区左边
  bodyLeft: {
    justifyContent: 'center'
  },

  // 内容区右边
  bodyRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 23
  },

  rightText: {
    marginRight: 18,
    fontSize: 28,
    color: '#999999'
  },

  rightIcon: {
    fontSize: 40,
    color: '#999999'
  },

  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  titleText: {
    marginRight: 10,
    fontSize: 32,
    color: '#333333',
  },

  briefWrap: {
    marginTop: 6
  },

  briefText: {
    fontSize: 28,
    color: '#999999'
  }
};

export default styles;
