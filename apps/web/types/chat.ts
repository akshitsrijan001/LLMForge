export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  prompt: string;
  model: string;
  history: Message[];
}

export interface ChatResponse {
  response: string;
}