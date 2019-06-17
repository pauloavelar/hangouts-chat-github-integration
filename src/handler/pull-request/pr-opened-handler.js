const fetch = require('node-fetch');

const { mapToOpenedPrMessage } = require('../../mapper/pr-opened-mapper');

module.exports = { handleOpenedPullRequest };

function handleOpenedPullRequest({ payload, url }) {
  const message = mapToOpenedPrMessage(payload);

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
}
