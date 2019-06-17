module.exports = { mapBody };

const MAX_LENGTH = 500;
const REGEX_BOLD = /\*\*(.+)\*\*/g;
const REGEX_ITALIC = /\*(.+)\*/g;

function mapBody(body = '') {
  const formattedBody = adjustFormatting(body);

  if (formattedBody.length > MAX_LENGTH) {
    return `${formattedBody.substr(0, MAX_LENGTH)}...`;
  }

  return formattedBody;
}

function adjustFormatting(body) {
  return body
    .replace(REGEX_BOLD, '<b>$1</b>')
    .replace(REGEX_ITALIC, '<i>$1</i>');
}
