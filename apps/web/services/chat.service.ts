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
    throw new Error(`Backend Error (${res.status})`);
  }

  const contentType = res.headers.get("content-type") ?? "";

  // Future support for JSON responses (image generation, tools, etc.)
  if (contentType.includes("application/json")) {
    return {
      type: "json",
      data: await res.json(),
    };
  }

  if (!res.body) {
    throw new Error("No response stream.");
  }

  return {
    type: "stream",
    data: res.body,
  };
}