"use client";

import { useState } from "react";
import { streamChat } from "@/services/chat.service";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface UploadedFile {
  name: string;
  path: string;
  text: string;
}

export function useForgeChat() {
  const [loading, setLoading] = useState(false);

  async function ask(
    messages: Message[],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    saveMessages: (id: string, messages: Message[]) => void,
    sessionId: string,
    prompt: string,
    model = "auto",
    files: UploadedFile[] = [],
    knowledgeBase = "default"
  ) {
    if (!prompt.trim()) return;

    const history = [...messages];

    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    // Add user message + empty assistant message
    setMessages((prev) => {
      const updated = [
        ...prev,
        userMessage,
        {
          role: "assistant" as const,
          content: "",
        },
      ];

      saveMessages(sessionId, updated);

      return updated;
    });

    setLoading(true);

    try {
      const stream = await streamChat({
        prompt,
        model,
        history,
        files,
        knowledge_base: knowledgeBase,
        generation_settings: {
          temperature: 0.4,
          topP: 0.95,
          context: 4096,
        },
      });

      if (!stream) {
        throw new Error("No stream returned");
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let response = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        response += decoder.decode(value, {
          stream: true,
        });

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "assistant",
            content: response,
          };

          saveMessages(sessionId, updated);

          return updated;
        });
      }
    } catch (err) {
      console.error(err);

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "assistant",
          content: "⚠️ Backend unavailable.",
        };

        saveMessages(sessionId, updated);

        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function stop() {
    console.log("Stop requested");
  }

  return {
    loading,
    ask,
    stop,
  };
}