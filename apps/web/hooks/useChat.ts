import { useState } from "react";
import { sendChat } from "../services/api.service";
import { Message } from "../types/chat";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  async function ask(prompt: string, model: string) {
    // User message
    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    // History INCLUDING current user message
    const history = [...messages, userMessage];

    // Immediately show user message
    setMessages(history);

    try {
      const result = await sendChat({
        prompt,
        model,
        history,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: result.response,
      };

      // Add assistant reply
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);

      const errorMessage: Message = {
        role: "assistant",
        content: "⚠️ Something went wrong.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  }

  return {
    messages,
    ask,
  };
}