const { wrapLambda } = require('./src/util/lambda-wrapper');
const { handleEvents } = require('./src/handler/event-handler');

module.exports = {
  handleEvents: wrapLambda(handleEvents),
};
