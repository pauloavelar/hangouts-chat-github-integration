const { actions } = require('../config/constants');

module.exports = { mapActionToTitle };

function mapActionToTitle(action, merged) {
  switch (action) {
    case actions.OPENED:
      return 'New Pull Request';
    case actions.CLOSED:
      return merged ? 'PR merged' : 'PR closed';
    default:
      return 'Unknown action';
  }
}
