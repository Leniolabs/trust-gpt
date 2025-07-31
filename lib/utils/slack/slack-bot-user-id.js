import slackWebClient from "../../clients/slack-web-client.js";

let botUserId = null;

export default async function getSlackBotUserId() {
  if(botUserId) return botUserId;
  const auth = await slackWebClient.auth.test();
  botUserId = auth.user_id;
  return botUserId;
};