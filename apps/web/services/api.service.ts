import { ChatRequest } from "../types/chat";

const API_URL = "http://127.0.0.1:8000";

export let currentController: AbortController | null = null;

export async function sendChat(
  request: ChatRequest,
  onChunk: (chunk: string) => void
) {currentController = new AbortController(); 
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
    signal: currentController.signal,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  if (!res.body) {
    throw new Error("No response body.");
  }

  const reader = res.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { value, done } = await reader.read();

  if (done) break;

  const chunk = decoder.decode(value, { stream: true });

  console.log("CHUNK:", JSON.stringify(chunk));

  onChunk(chunk);
}

  



} // sendChat

export function stopGeneration() {
  currentController?.abort();
}