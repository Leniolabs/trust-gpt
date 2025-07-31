import slackWebClient from "../../lib/clients/slack-web-client.js";

export default function postSlackMessage(event, thread, response) {
  return slackWebClient.chat.postMessage({
    channel: event.channel,
    thread_ts: thread, // Use thread_ts if available, otherwise start a new thread
    text: response,
  });
}
