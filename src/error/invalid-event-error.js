class InvalidEventError extends Error {
  constructor(eventType) {
    super(`Unsupported event '${eventType}', message not created`);
  }
}

module.exports = { InvalidEventError };
