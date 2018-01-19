import { vLoader } from 'nuke-core';

function variable(theme) {
  const { Core } = theme;

  return {
    // menu（BSR）组件可变项

    // item
    'menu-height': vLoader(Core.s12),
    'menu-padding-top-bottom': vLoader(Core.s3),
    'menu-padding-left-right': vLoader(Core.s4),
    'menu-background-color': vLoader(Core['color-white']),

    'menu-border-color': vLoader(Core['color-line1-1']),
    'menu-border-style': vLoader(Core['line-solid']),
    'menu-border-width': vLoader(Core['line-1']),

    // text
    'menu-text-font-size': vLoader(Core.s4),
    'menu-text-color': vLoader(Core['color-text1-4']),
    'menu-text-active-font-size': vLoader(Core.s4),
    'menu-text-active-color': vLoader(Core['color-brand1-6']),

    // icon
    'menu-icon': vLoader(Core['icon-m'] / 2),
  };
}

module.exports = variable;
