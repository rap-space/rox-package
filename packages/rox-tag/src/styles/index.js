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
  const tagItemBaseStyle = {
    minWidth: variables['tagitem-min-width'],
    height: variables['tagitem-height'],
    paddingLeft: variables['tagitem-padding'],
    paddingRight: variables['tagitem-padding'],
    fontSize: variables['tagitem-font-size'],
    borderWidth: 1
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
      normal: {
        ...tagItemBaseStyle,
        borderColor: variables['tagitem-normal-border-color'],
        backgroundColor: variables['tagitem-normal-background-color'],
        color: variables['tagitem-normal-color']
      },
      press: {
        ...tagItemBaseStyle,
        borderColor: variables['tagitem-press-border-color'],
        backgroundColor: variables['tagitem-press-background-color'],
        color: variables['tagitem-press-color']
      },
      selected: {
        ...tagItemBaseStyle,
        borderColor: variables['tagitem-selected-border-color'],
        backgroundColor: variables['tagitem-selected-background-color'],
        color: variables['tagitem-selected-color']
      }
    },
    TagSelector: {

    }
  };
}

export default tagStyle;
