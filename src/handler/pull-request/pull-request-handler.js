'use strict';

const { actions } = require('../../config/constants');
const { urls } = require('../../config/constants');
const { buildUrl } = require('../../util/http-helper');
const { InvalidActionError } = require('../../error/invalid-action-error');

const { handleOpenedPullRequest } = require('./pr-opened-handler');
const { handleClosedPullRequest } = require('./pr-closed-handler');

module.exports = { handlePullRequest };

function handlePullRequest(options) {
  const { spaceId, key, token, payload } = options;
  const threadKey = payload.pull_request.id;

  const url = buildUrl(urls.HANGOUTS_CHAT_URL, { spaceId }, { key, token, threadKey });
  const fullOptions = { url, ...options };

  switch (options.action) {
    case actions.OPENED:
      return handleOpenedPullRequest(fullOptions);
    case actions.CLOSED:
      return handleClosedPullRequest(fullOptions);
    default:
      throw InvalidActionError(options.action);
  }
}
