import getVariables from './variable';

function tagStyle(theme = {}) {
  const variables = getVariables(theme);
  const baseStyle = {
    fontSize: variables['tag-font-size'],
    height: variables['tag-height'],
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
    paddingRight: 2
  };

  return {
    // 只读类型的 Tag 展示
    Tag: {
      normal: {
        ...baseStyle,
        borderColor: variables['tag-border-color'],
        backgroundColor: variables['tag-normal-background-color'],
        color: variables['tag-normal-color']
      },
      primary: {
        ...baseStyle,
        borderColor: variables['tag-border-color'],
        backgroundColor: variables['tag-primary-background-color'],
        color: variables['tag-primary-color']
      }
    },
    TagItem: {
      
    }
  };
}

export default tagStyle;
