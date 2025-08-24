# TrustGPT

A Slack bot that facilitates trust-building conversations and workflows. This project uses the Slack Web API and OpenAI to respond to mentions and DMs in your workspace.

## Requirements

- **Node.js** >= 20
- A Slack App with a Bot User
- Environment variables:
  - `SLACK_BOT_TOKEN` — your bot token (starts with `xoxb-...`)
  - `OPENAI_API_KEY` — your OpenAI API key

```bash
# .env example
SLACK_BOT_TOKEN=xoxb-***
OPENAI_API_KEY=sk-***
```

## Quickstart (Local)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the app**
   ```bash
   npm start
   ```

3. **Expose your local server (optional but recommended for Slack events)**  
   Use ngrok (or any HTTPS tunnel) so Slack can reach your local machine. See **Local testing with ngrok** below.

## Slack App Manifest

Use the following manifest when creating your Slack App. Replace the `request_url` with your public HTTPS URL (e.g., your ngrok forwarding URL).

```json
{
  "display_information": {
    "name": "TrustGPT"
  },
  "features": {
    "bot_user": {
      "display_name": "TrustGPT",
      "always_online": false
    }
  },
  "oauth_config": {
    "scopes": {
      "bot": [
        "app_mentions:read",
        "channels:history",
        "chat:write",
        "commands",
        "groups:history",
        "groups:read",
        "im:history",
        "reactions:write",
        "files:read"
      ]
    }
  },
  "settings": {
    "event_subscriptions": {
      "request_url": "https://<your-domain-or-tunnel>/slack/events",
      "bot_events": [
        "app_mention",
        "message.channels",
        "message.im"
      ]
    },
    "org_deploy_enabled": false,
    "socket_mode_enabled": false,
    "token_rotation_enabled": false
  }
}
```

## Local testing with ngrok

1. **Install ngrok**  
   - macOS (Homebrew): `brew install ngrok/ngrok/ngrok`  
   - Other platforms: see https://ngrok.com/download

2. **Run your app locally**  
   Make sure your app is running (see **Quickstart**). Take note of the local port (e.g., `3000`).

3. **Start ngrok**
   ```bash
   ngrok http 3000
   ```
   This will give you a **Forwarding** URL like `https://abcd1234.ngrok-free.app`.

4. **Point Slack to your tunnel**
   - In your Slack App settings → **Event Subscriptions**, enable events and set:
     - **Request URL** = `https://<your-ngrok-subdomain>.ngrok-free.app/slack/events`
   - Save changes. Slack will verify the endpoint.

5. **Reinstall the app (if prompted)**  
   After changing scopes or the request URL, Slack may require you to reinstall the app to your workspace.
