module.exports = { getWhitelistedSpaces };

function getWhitelistedSpaces() {
  const spaces = process.env.WHITELISTED_SPACES || '';
  return spaces.split(/[,;-\s]/).filter(Boolean);
}
