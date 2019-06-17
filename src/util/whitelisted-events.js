module.exports = { getWhitelistedEvents };

const validEvents = [
  'pull_request',
];

function getWhitelistedEvents() {
  return validEvents;
}
