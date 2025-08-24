import getImageFromPrivateUrl from "./get-image-from-private-url.js";

const buildImagesFromThread = async (message) => {
  // settle each file promise
  const fileSettled = await Promise.allSettled(
    message.files.map(async (file) => ({
      type: "input_image",
      image_url: await getImageFromPrivateUrl(file.url_private, file.mimetype),
    }))
  );

  // keep only fulfilled file results
  const images = fileSettled
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);

  return [{ type: "input_text", text: message.text }, ...images];
};

export default buildImagesFromThread;
