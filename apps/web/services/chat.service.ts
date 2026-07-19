const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

export async function streamChat(body: any) {
  const res = await fetch(`${API}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.body;
}