'use strict';

const fetch = require('node-fetch');

const { mapToClosedPrMessage } = require('../../mapper/pr-closed-mapper');

module.exports = { handleClosedPullRequest };

function handleClosedPullRequest({ payload, url }) {
  const message = mapToClosedPrMessage(payload);

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
}
