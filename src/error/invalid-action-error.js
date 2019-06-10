class InvalidActionError extends Error {
  constructor(action) {
    super(`Unsupported action '${action}', message not created`);
  }
}

module.exports = { InvalidActionError };
