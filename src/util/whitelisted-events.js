const validEvents = [
  'pull_request'
];

module.exports = {
  isEventValid
};

function isEventValid(event) {
  const eventType = event.headers['X-GitHub-Event'];
  return validEvents.includes(eventType);
}
