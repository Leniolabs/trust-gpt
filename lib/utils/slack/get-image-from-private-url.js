async function getImageFromPrivateUrl(urlPrivate, mimeType) {
  const resp = await fetch(urlPrivate, {
    headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` },
  });

  if (!resp.ok) {
    throw new Error(`Slack download failed: ${resp.status} ${resp.statusText}`);
  }

  const buffer = Buffer.from(await resp.arrayBuffer());
  const base64 = buffer.toString("base64");
  return `data:${mimeType};base64,${base64}`;
}

export default getImageFromPrivateUrl;