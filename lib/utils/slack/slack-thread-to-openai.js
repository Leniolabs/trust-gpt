export default function slackToOpenAI(threadMessages, botUserId) {
  // Remove bot's user id mentions, if any, for cleaner context
  return threadMessages.map(msg => {
    // If the message is from the bot, mark as 'assistant', else 'user'
    const role = msg.user === botUserId ? "assistant" : "user";
    // Remove the bot mention (e.g., <@UXXXXXX>)
    const cleanText = msg.text.replace(new RegExp(`<@${botUserId}>`, 'g'), '').trim();
    return {
      role,
      content: cleanText
    };
  });
}