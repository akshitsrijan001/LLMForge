const API = "http://127.0.0.1:8000";

export async function getDashboardStats() {
  const res = await fetch(`${API}/dashboard`, {
    cache: "no-store",
  });

  return await res.json();
}