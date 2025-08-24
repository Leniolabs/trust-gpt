const removeWrongFormatting = (input) => {
  if (typeof input !== "string") return input;
  let text = input;
  // Convert bold: **text** -> *text*
  text = text.replace(/\*\*(.*?)\*\*/g, "*$1*");
  // Convert links: [label](url) -> <url|label>
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<$2|$1>");
  return text;
};

export default removeWrongFormatting;
