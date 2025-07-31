
import { getThreadMessages } from "../lib/utils/slack/get-thread-messages.js";
import slackToOpenAI from "../lib/utils/slack/slack-thread-to-openai.js";
import getSlackBotUserId from "../lib/utils/slack/slack-bot-user-id.js";
import chat from "../services/openai/chat.js";
import postSlackMessage from "../services/slack/post-message.js";

export default async (req, res) => {
  const { type, challenge, event } = req.body;

  // Slack URL verification challenge
  if (type === "url_verification") {
    return res.status(200).send({ challenge });
  }

  // Event callback
  if (type === "event_callback") {
    // Example: Respond to an @mention
    if (event && event.type === "app_mention") {
      res.status(200).send();
      try {
        const threadTs = event.thread_ts || event.ts;
        const threadMessages = await getThreadMessages(event.channel, threadTs);
        const botUserId = await getSlackBotUserId();
        const openAIContext = slackToOpenAI(threadMessages, botUserId);
        const response = await chat(openAIContext);
        await postSlackMessage(event, threadTs, response)
      } catch (error) {
        console.error("Error posting message:", error);
      }
      return;
    }
    // Respond to Slack quickly
    return res.status(200).send();
  }
  // Default response
  res.status(200).send();
}