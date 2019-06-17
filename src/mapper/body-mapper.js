module.exports = { mapBody };

const MAX_LENGTH = 255;

function mapBody(body = '') {
  return body.length > MAX_LENGTH ? `${body.substr(0, MAX_LENGTH)}...` : body;
}
