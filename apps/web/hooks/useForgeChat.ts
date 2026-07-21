"use client";

import { useState } from "react";
import { streamChat } from "@/services/chat.service";
import { saveMessage } from "@/services/api.service";
import { searchWeb } from "@/services/search.service";

export interface WebSource {
  title: string;
  link: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;

  images?: string[];
  sources?: WebSource[];
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



      return updated;
    });

    setLoading(true);

let response = "";

let webContext = "";
let webImages: string[] = [];
let webSources: any[] = [];

try {

  const search = await searchWeb(prompt);

  webContext = search.context;
  webImages = search.images;
  webSources = search.sources;
      const stream = await streamChat({
        prompt,
        model,
        history,
        files,
        knowledge_base: knowledgeBase,
        web_context: webContext,
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

        return updated;
      });
      setMessages((prev) => {
  const updated = [...prev];

  updated[updated.length - 1] = {
    role: "assistant",
    content: response,
    images: webImages,
    sources: webSources,
  };

  return updated;
});
    } finally {
      if (sessionId) {
    const finalMessages = [
    ...history,
    userMessage,
    {
        role: "assistant" as const,
        content: response,
        images: webImages,
        sources: webSources,
    },
];

    await saveMessage(
        sessionId,
        "user",
        userMessage.content
    );

    await saveMessage(
        sessionId,
        "assistant",
        response
    );
}
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