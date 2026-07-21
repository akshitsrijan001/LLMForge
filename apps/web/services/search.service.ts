const API_URL = "http://localhost:8000";

export async function searchWeb(query: string) {
  const res = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  if (!res.ok) {
    throw new Error("Search failed");
  }

  return res.json();
}