import VariableMix from './variable';

function styleProvider(theme = {}) {
  const Variables = VariableMix(theme);
  const core = theme.Core;
  return {
    Progress: {
      'progress-wrap': {
        height: Variables['progress-height'],
        backgroundColor: Variables['progress-bg'],
        flexDirection: 'row',
      },
      'progress-inner': {
        backgroundColor: Variables['progress-color'],
      }
    },
  };
}
module.exports = styleProvider;