const API = "http://127.0.0.1:8000";

export async function indexProject(
  path: string,
  knowledge_base: string
) {
  const res = await fetch(`${API}/upload-project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path,
      knowledge_base,
    }),
  });

  return await res.json();
}