module.exports = { buildResponse };

const headers = {
  'Access-Control-Allow-Origin': '*',
}

function buildResponse(body, statusCode = 200) {
  return { statusCode, headers, body: JSON.stringify(body) };
}
