import { vLoader } from 'nuke-core';

function variable(theme) {
  const { Core } = theme;

  // Tag 组件可变项
  return {
    'tag-height': vLoader(Core.s3),
    'tag-font-size': vLoader(Core['font-size-footnote']),
    'tag-border-color': vLoader(Core['color-brand1-6']),
    'tag-primary-background-color': vLoader(Core['color-brand1-6']),
    'tag-primary-color': vLoader(Core['color-white']),
    'tag-normal-background-color': vLoader(Core['color-white']),
    'tag-normal-color': vLoader(Core['color-brand1-6']),
    'tag-list-gutter': 2
  };
}

module.exports = variable;
