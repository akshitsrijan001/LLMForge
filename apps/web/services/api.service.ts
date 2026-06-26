import { ChatRequest, ChatResponse } from "../types/chat";

const API_URL = "http://127.0.0.1:8000";

export async function sendChat(
  request: ChatRequest
): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const data = await res.json();

  return {
    response: data.response,
  };
}