'use strict';

const fetch = require('node-fetch');

const { buildResponse } = require('./util/http-helper');
const { getWhitelistedSpaces } = require('./util/whitelisted-spaces');

module.exports = handlePullRequests;

async function handlePullRequests(event, _, callback) {
  try {
    const validSpaces = getWhitelistedSpaces();
    const { spaceId } = event.pathParameters;

    if (!validSpaces.includes(spaceId)) {
      return callback(null, buildResponse({ error: 'Unauthorized spaceId' }, 403));
    }

    const { key, token } = event.queryStringParameters;
    const body = JSON.parse(event.body);

    const url = mapToUrl(spaceId, key, token);
    const message = mapToHangoutsMessage(body);

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  
    callback(null, buildResponse(response));
  } catch (err) {
    const body = { error: 'Invalid payload: ' + err.message };
    callback(null, buildResponse(body, 400));
  }
}

function mapToUrl(spaceId, key, token) {
  return `https://chat.googleapis.com/v1/spaces/${spaceId}/messages?key=${key}&token=${token}`;
}

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
                  text: body.pull_request.body
                }
              }
            ]
          },
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Source branch',
                  content: body.pull_request.head.ref,
                  contentMultiline: false,
                  onClick: {
                    openLink: {
                      url: mapToBranchUrl(body.pull_request.head.ref, body),
                    }
                  },
                  icon: 'BOOKMARK'
                }
              },
              {
                keyValue: {
                  topLabel: 'Target branch',
                  content: body.pull_request.base.ref,
                  contentMultiline: false,
                  onClick: {
                    openLink: {
                      url: mapToBranchUrl(body.pull_request.base.ref, body),
                    }
                  },
                  icon: 'BOOKMARK'
                }
              }
            ]
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
                          url: body.pull_request.html_url
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]

      }
    ]
  }
}

function mapActionToTitle(action) {
  switch (action) {
    case 'opened':
      return 'New Pull Request';
    default:
      throw new Error('Not yet implemented');
  }
}

function mapToBranchUrl(branchName, body) {
  return `${body.repository.html_url}/tree/${branchName}`;
}
