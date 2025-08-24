

export default function slackToOpenAI(threadMessages, botUserId) {
  // Remove bot's user id mentions, if any, for cleaner context
  return threadMessages.map((msg) => {
    // If the message is from the bot, mark as 'assistant', else 'user'
    const role = msg.user === botUserId ? "assistant" : "user";
    if (Array.isArray(msg)) {
      return {
        role,
        content: msg,
      };
    }
    return {
      role,
      content: msg.text,
    };
  });
}
