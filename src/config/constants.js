const actions = {
  OPENED: 'opened',
  CLOSED: 'closed',
};

const events = {
  PULL_REQUEST: 'pull_request',
};

const headers = {
  GITHUB_EVENT: 'X-GitHub-Event',
};

const urls = {
  HANGOUTS_CHAT_URL: 'https://chat.googleapis.com/v1/spaces/{spaceId}/messages',
};

module.exports = { actions, events, headers, urls };
