import slackWebClient from "../../clients/slack-web-client.js";
import buildImagesFromThread from "./build-images-from-message.js";

export async function getThreadMessages(channelId, threadTs) {
  try {
    const result = await slackWebClient.conversations.replies({
      channel: channelId,
      ts: threadTs,
    });

    const settled = await Promise.allSettled(
      result.messages.map(async (message) => {
        if (message.files) {
          return buildImagesFromThread(message);
        }
        return { text: message.text, user: message.user };
      })
    );

    return settled.filter((r) => r.status === "fulfilled").map((r) => r.value);
  } catch (error) {
    console.error("Error fetching thread messages:", error);
    return [];
  }
}
