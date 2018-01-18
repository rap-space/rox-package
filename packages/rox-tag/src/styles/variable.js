import { vLoader } from 'nuke-core';

function variable(theme) {
  const { Core } = theme;

  return {
    // Tag（BSR）组件可变项
    'tag-height': vLoader(Core.s3),
    'tag-font-size': vLoader(Core['font-size-footnote']),
    'tag-border-color': vLoader(Core['color-brand1-6']),
    'tag-primary-background-color': vLoader(Core['color-brand1-6']),
    'tag-primary-color': vLoader(Core['color-white']),
    'tag-normal-background-color': vLoader(Core['color-white']),
    'tag-normal-color': vLoader(Core['color-brand1-6']),
    'tag-list-gutter': 2,
    // TagItem（Filter）组件可变项
    'tagitem-min-width': 56,
    'tagitem-height': vLoader(Core.s9),
    'tagitem-padding': vLoader(Core.s2),
    'tagitem-margin-bottom': vLoader(Core.s2),
    'tagitem-font-size': vLoader(Core['font-size-subhead']),
    'tagitem-normal-background-color': vLoader(Core['color-white']),
    'tagitem-normal-border-color': vLoader(Core['color-fill1-3']),
    'tagitem-normal-color': vLoader(Core['color-text1-4']),
    'tagitem-press-background-color': vLoader(Core['color-fill1-2']),
    'tagitem-press-border-color': vLoader(Core['color-fill1-3']),
    'tagitem-press-color': vLoader(Core['color-text1-4']),
    'tagitem-selected-background-color': vLoader(Core['color-white']),
    'tagitem-selected-border-color': vLoader(Core['color-brand1-6']),
    'tagitem-selected-color': vLoader(Core['color-brand1-6'])
  };
}

module.exports = variable;
