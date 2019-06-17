const { headers } = require('../config/constants');
const { buildResponse } = require('./http-helper');
const { InvalidActionError } = require('../error/invalid-action-error');
const { InvalidEventError } = require('../error/invalid-event-error');
const { UnauthorizedSpaceError } = require('../error/unauthorized-space-error');
const { getWhitelistedEvents } = require('./whitelisted-events');
const { getWhitelistedSpaces } = require('./whitelisted-spaces');

module.exports = { wrapLambda };

function wrapLambda(handler) {
  return async function lambdaHandler(event, _, callback) {
    try {
      const { spaceId } = event.pathParameters;
      const { key, token } = event.queryStringParameters;

      const eventType = event.headers[headers.GITHUB_EVENT];
      const payload = JSON.parse(event.body);
      const { action } = payload;

      const validSpaces = getWhitelistedSpaces();
      if (!validSpaces.includes(spaceId)) {
        throw new UnauthorizedSpaceError(spaceId);
      }

      const validEvents = getWhitelistedEvents();
      if (!validEvents.includes(eventType)) {
        throw new InvalidEventError(eventType);
      }

      const response = await handler({ spaceId, payload, key, token, eventType, action });

      callback(null, buildResponse(response, 201));
    } catch (err) {
      if (err instanceof InvalidEventError) {
        return callback(null, buildResponse({ message: err.message }, 200));
      }

      if (err instanceof InvalidActionError) {
        return callback(null, buildResponse({ message: err.message }, 200));
      }

      if (err instanceof UnauthorizedSpaceError) {
        return callback(null, buildResponse({ message: err.message }, 403));
      }

      callback(null, buildResponse({ message: `Invalid payload: ${err.message}` }, 400));
    }
  };
}
