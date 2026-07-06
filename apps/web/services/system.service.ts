const API = "http://127.0.0.1:8000";

export async function getInstalledModels() {
  const res = await fetch(`${API}/system/models`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load models");
  }

  return await res.json();
}