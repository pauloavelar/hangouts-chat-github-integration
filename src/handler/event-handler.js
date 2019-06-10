const { events } = require('../config/constants');
const { InvalidEventError } = require('../error/invalid-event-error');

const { handlePullRequest } = require('./pull-request/pull-request-handler');

function handleEvents(options) {
  switch (options.event) {
    case events.PULL_REQUEST:
      return handlePullRequest(options);
    default:
      throw new InvalidEventError(`Event not supported: ${options.event}`);
  }
}

module.exports = {
  handleEvents,
};
