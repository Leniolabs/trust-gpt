import slackWebClient from '../../clients/slack-web-client.js'

export async function getThreadMessages(channelId, threadTs) {
  try {
    const result = await slackWebClient.conversations.replies({
      channel: channelId,
      ts: threadTs, // The parent message's ts
    });
    return result.messages?.map(m => ({text: m.text, user: m.user})); // Array of messages in the thread
  } catch (error) {
    console.error('Error fetching thread messages:', error);
    return [];
  }
}