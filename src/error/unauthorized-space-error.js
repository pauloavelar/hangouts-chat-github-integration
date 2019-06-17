class UnauthorizedSpaceError extends Error {
  constructor(spaceId) {
    super(`Unauthorized space '${spaceId}'`);
  }
}

module.exports = { UnauthorizedSpaceError };
