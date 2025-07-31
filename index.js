import express from "express";
import bodyParser from "body-parser";
import slack from "./controllers/slack.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Basic health check
app.get("/", (req, res) => {
  res.send("Slack bot is running!");
});

// Slack event endpoint
app.post("/slack/events", slack);

app.listen(port, () => {
  console.log(`Slack bot listening at http://localhost:${port}`);
});
