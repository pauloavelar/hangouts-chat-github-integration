const { mapActionToTitle } = require('./card-title-mapper');

module.exports = { mapToClosedPrMessage };

function mapToClosedPrMessage(body) {
  return {
    cards: [{
      header: {
        title: mapActionToTitle(body.action),
        subtitle: mapToSubtitle(body),
        imageUrl: mapCardImage(body.merged),
        imageStyle: 'AVATAR',
      },
    }],
  };
}

function mapToSubtitle(body) {
  const { merged } = body.pull_request;

  if (merged) {
    return `Merged by ${body.pull_request.merged_by.login}`;
  }

  return `Closed by ${body.sender.login}`;
}

function mapCardImage(merged) {
  const image = merged ? 'merged' : 'closed';
  return `https://hangouts-github-integration-assets.s3.amazonaws.com/pr_${image}.png`;
}
