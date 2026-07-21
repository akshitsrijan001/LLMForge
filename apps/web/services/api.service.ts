import { ChatRequest } from "../types/chat";

const API_URL = "http://127.0.0.1:8000";

export let currentController: AbortController | null = null;

export async function sendChat(
  request: ChatRequest,
  onChunk: (chunk: string) => void
) {
  currentController = new AbortController();

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

    onChunk(chunk);
  }
}

export function stopGeneration() {
  currentController?.abort();
}

/* ==========================================
   Sessions API
========================================== */

export async function createSession() {
  const res = await fetch(`${API_URL}/sessions/`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to create session");

  return res.json();
}

export async function getSessions() {
  const res = await fetch(`${API_URL}/sessions/`);

  if (!res.ok) throw new Error("Failed to load sessions");

  return res.json();
}

export async function shareSession(sessionId: string) {
  const res = await fetch(
    `${API_URL}/sessions/${sessionId}/share`,
    {
      method: "POST",
    }
  );

  if (!res.ok) throw new Error("Share failed");

  return res.json();
}

export async function getSharedChat(shareId: string) {
  const res = await fetch(
    `${API_URL}/sessions/share/${shareId}`
  );

  if (!res.ok) throw new Error("Cannot load shared chat");

  return res.json();
}

export async function getSession(sessionId: string) {
  const res = await fetch(`${API_URL}/sessions/${sessionId}`);

  if (!res.ok) throw new Error("Failed to load session");

  return res.json();
}

export async function saveMessage(
  sessionId: string,
  role: "user" | "assistant",
  content: string
) {
  const res = await fetch(
    `${API_URL}/sessions/${sessionId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        content,
      }),
    }
  );

  if (!res.ok) throw new Error("Failed to save message");

  return res.json();
}

export async function deleteSession(sessionId: string) {
  const res = await fetch(`${API_URL}/sessions/${sessionId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete session");

  return res.json();
}