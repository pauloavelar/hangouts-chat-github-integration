
module.exports = { buildResponse, buildUrl };

const headers = {
  'Access-Control-Allow-Origin': '*',
};

function buildResponse(body, statusCode = 200) {
  return { statusCode, headers, body: JSON.stringify(body) };
}

function buildUrl(url = '', pathParams = {}, queryParams = {}) {
  return Object
    .entries(pathParams)
    .reduce((result, [key, value]) => result.replace(`{${key}}`, value), url)
    .concat('?', buildQueryString(queryParams));
}

function buildQueryString(queryParams = {}, encode = false) {
  return Object
    .entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .map((param) => encode ? encodeURI(param) : param)
    .join('&');
}
