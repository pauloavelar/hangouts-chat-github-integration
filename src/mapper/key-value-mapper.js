module.exports = { mapKeyValue };

function mapKeyValue({ topLabel, content, url, icon = 'BOOKMARK' }) {
  return {
    keyValue: {
      topLabel,
      content,
      contentMultiline: false,
      onClick: {
        openLink: { url },
      },
      icon,
    },
  };
}
