import openaiClient from "../../lib/clients/openai-client.js";
import prompt from "../../lib/prompts/prompt.js";
import removeWrongFormatting from "../../lib/utils/openai/remove-wrong-formatting.js";

export default async function chat(context) {
  const input = [
    {
      role: "system",
      content: prompt,
    },
    ...(context || []),
  ];

  // Get AI response
  const response = await openaiClient.responses.create({
    model: "gpt-4.1",
    tools: [
        { type: "web_search_preview" },
    ],
    input,
    temperature: 0.7,
  });

  return removeWrongFormatting(response.output_text);
}
