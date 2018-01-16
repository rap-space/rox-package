'use strict';


function VariableMix(theme) {
  const core = theme.Core;
  const ComponentCustomStyle = theme.Progress;

  const variables = {
    'progress-bg': core['color-fill1-3'],
    'progress-height': 20,
    'progress-color': core['color-brand1-6'],
  }
  return { ...variables, ...ComponentCustomStyle };
}
module.exports = VariableMix;