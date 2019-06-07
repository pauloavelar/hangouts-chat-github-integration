'use strict';

const fetch = require('node-fetch');

const { buildResponse } = require('./util/http-helper');
const { isEventValid } = require('./util/whitelisted-events');
const { getWhitelistedSpaces } = require('./util/whitelisted-spaces');
const { mapToHangoutsMessage } = require('./mapper/pull-request-mapper');
const { InvalidEventError } = require('./error/invalid-event-error');

module.exports = {
  handlePullRequests
};

async function handlePullRequests(event, _, callback) {
  try {
    const { spaceId } = event.pathParameters;
    const { key, token } = event.queryStringParameters;
    
    const validSpaces = getWhitelistedSpaces();
    if (!validSpaces.includes(spaceId)) {
      return callback(null, buildResponse({ error: 'Unauthorized spaceId' }, 403));
    }

    if (!isEventValid(event)) {
      throw new InvalidEventError();
    }

    const body = JSON.parse(event.body);

    const url = mapToUrl(spaceId, key, token);
    const message = mapToHangoutsMessage(body);

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
  
    callback(null, buildResponse(response, 201));
  } catch (err) {
    handleErrors(err, callback);
  }
}

function mapToUrl(spaceId, key, token) {
  return `https://chat.googleapis.com/v1/spaces/${spaceId}/messages?key=${key}&token=${token}`;
}

function handleErrors(err, callback) {
  if (err instanceof InvalidEventError) {
    return callback(null, buildResponse({
      message: 'Message not created, event not supported yet'
    }, 200));
  }
  
  callback(null, buildResponse({
    message: 'Invalid payload: ' + err.message
  }, 400));
}
