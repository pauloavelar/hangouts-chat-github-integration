const { actions } = require('../config/constants');

module.exports = { mapActionToTitle };

function mapActionToTitle(action) {
  switch (action) {
    case actions.OPENED:
      return 'New Pull Request';
    case actions.CLOSED:
      return 'Pull Request updated';
    default:
      return 'Unknown action';
  }
}
