const { mapKeyValue } = require('./key-value-mapper');

module.exports = { mapToHangoutsMessage };

function mapToHangoutsMessage(body) {
  return {
    cards: [
      {
        header: {
          title: mapActionToTitle(body.action),
          subtitle: body.repository.name,
          imageUrl: body.pull_request.user.avatar_url,
          imageStyle: 'AVATAR',
        },
        sections: [
          {
            header: body.pull_request.title,
            widgets: [
              {
                textParagraph: {
                  text: body.pull_request.body,
                },
              },
            ],
          },
          {
            widgets: [
              mapKeyValue({
                topLabel: 'Source branch',
                content: body.pull_request.head.ref,
                url: mapToBranchUrl(body.pull_request.head.ref, body),
              }),
              mapKeyValue({
                topLabel: 'Target branch',
                content: body.pull_request.base.ref,
                url: mapToBranchUrl(body.pull_request.base.ref, body),
              }),
            ],
          },
          {
            widgets: [
              {
                buttons: [
                  {
                    textButton: {
                      text: 'VIEW PULL REQUEST',
                      onClick: {
                        openLink: {
                          url: body.pull_request.html_url,
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

function mapActionToTitle(action) {
  switch (action) {
    case 'opened':
      return 'New Pull Request';
    default:
      return 'Unknown action';
  }
}

function mapToBranchUrl(branchName, body) {
  return `${body.repository.html_url}/tree/${branchName}`;
}
