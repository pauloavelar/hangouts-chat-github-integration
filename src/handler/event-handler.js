const { events } = require('../config/constants');
const { handlePullRequest } = require('./pull-request/pull-request-handler');
const { InvalidEventError } = require('../error/invalid-event-error');

module.exports = { handleEvents };

function handleEvents(options) {
  switch (options.eventType) {
    case events.PULL_REQUEST:
      return handlePullRequest(options);
    default:
      throw new InvalidEventError(`Event not supported: ${options.eventType}`);
  }
}
