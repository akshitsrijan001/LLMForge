"use client";

import { useState } from "react";
import { streamChat } from "@/services/chat.service";
import { saveMessage } from "@/services/api.service";
import { searchWeb } from "@/services/search.service";
import { generateImage } from "@/services/image.service";
import { toast } from "sonner";

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

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        role: "assistant",
        content: "",
      },
    ]);

    setLoading(true);

    const imageRequest =
  /\b(generate|create|draw|design|illustrate)\b/i.test(prompt) &&
  /\b(image|picture|photo|art|logo|portrait)\b/i.test(prompt);

if (imageRequest) {
  try {
    const data = await generateImage(prompt);

    const imageUrl =
      `http://127.0.0.1:8188/view?filename=${data.image.filename}` +
      `&subfolder=${data.image.subfolder}` +
      `&type=${data.image.type}`;
      

    setMessages(prev => {
      const updated = [...prev];

      updated[updated.length - 1] = {
        role: "assistant",
        content: "",
        images: [imageUrl],
      };

      return updated;
    });
    toast.success("Image generated successfully!");

    if (sessionId) {
      await saveMessage(sessionId, "user", prompt);
      await saveMessage(
  sessionId,
  "assistant",
  JSON.stringify({
    content: "",
    images: [imageUrl],
  })
);
    }

    return;
  } catch (err) {
    console.error(err);

    setMessages(prev => {
      const updated = [...prev];

      updated[updated.length - 1] = {
        role: "assistant",
        content: "❌ Image generation failed.",
      };

      return updated;
    });

    return;
  } finally {
    setLoading(false);
  }
}

    let response = "";
    let webContext = "";
    let webImages: string[] = [];
    let webSources: WebSource[] = [];

    try {
      // Optional web search
      try {
        const search = await searchWeb(prompt);

        webContext = search.context ?? "";
        webImages = search.images ?? [];
        webSources = search.sources ?? [];
      } catch {
        console.log("No web search results.");
      }

      const result = await streamChat({
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

const reader = result.data.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();

  if (done) break;

  response += decoder.decode(value, {
    stream: true,
  });

  setMessages(prev => {
    const updated = [...prev];

    updated[updated.length - 1] = {
      role: "assistant",
      content: response,
      images: webImages,
      sources: webSources,
    };

    return updated;
  });
}

      if (sessionId) {
        await saveMessage(sessionId, "user", userMessage.content);
        await saveMessage(sessionId, "assistant", response);
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