import openaiClient from "../../lib/clients/openai-client.js";
import prompt from "../../lib/prompts/prompt.js";

export default async function chat(context) {
  const messages = [
    {
      role: "system",
      content: prompt,
    },
    ...(context || []),
  ];

  // Get AI response
  const response = await openaiClient.chat.completions.create({
    model: "gpt-4.1",
    messages,
    temperature: 0.7,
  });

  const aiResponse =
    response.choices[0]?.message?.content ||
    "Sorry, I could not generate a response.";

  return aiResponse;
}
