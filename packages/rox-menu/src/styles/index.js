import getVariables from './variable';

function tagStyle(theme = {}) {
  const variables = getVariables(theme);

  return {
    MenuList: {
      container: {

      },
      item: {
        height: variables['menu-height'],
        backgroundColor: variables['menu-background-color'],
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: variables['menu-padding-left-right'],
        paddingRight: variables['menu-padding-left-right'],
        paddingTop: variables['menu-padding-top-bottom'],
        paddingBottom: variables['menu-padding-top-bottom'],
        borderBottomColor: variables['menu-border-color'],
        borderBottomStyle: variables['menu-border-style'],
        borderBottomWidth: variables['menu-border-width'],
      },

      text: {
        fontSize: variables['menu-text-font-size'],
        color: variables['menu-text-color'],
        flex: 1,
      },
      textActive: {
        fontSize: variables['menu-text-active-font-size'],
        color: variables['menu-text-active-color'],
        flex: 1,
      },
      icon: {
        color: variables['menu-text-active-color'],
      },
    },

    Menu: {

    }
  };
}

export default tagStyle;
