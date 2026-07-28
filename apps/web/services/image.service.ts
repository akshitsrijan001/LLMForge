console.log(process.env.NEXT_PUBLIC_API_URL);
const API = process.env.NEXT_PUBLIC_API_URL;

export async function generateImage(
  prompt: string,
  style = "realistic"
) {

  const res = await fetch(`${API}/generate-image`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      prompt,
      style,
    }),
  });

  if (!res.ok) {
    throw new Error("Image generation failed");
  }

  return res.json();
}