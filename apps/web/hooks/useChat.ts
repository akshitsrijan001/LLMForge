import { useEffect, useRef, useState } from "react";
import {
  sendChat,
  stopGeneration,
} from "../services/api.service";
import {
  Message,
  UploadedFile,
} from "../types/chat";
import { useSettings } from "./useSettings";
import { useKnowledgeBase } from "./useKnowledgeBase";

export function useChat(
  initialMessages: Message[],
  onMessagesChange: (messages: Message[]) => void
) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const settings = useSettings();

  const messagesRef = useRef<Message[]>([]);
  const initialized = useRef(false);
  const { knowledgeBase } = useKnowledgeBase();

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;
    messagesRef.current = initialMessages;
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  async function ask(
    prompt: string,
    model: string,
    files: UploadedFile[] = []
  ) {
    const userMessage: Message = {
      role: "user",
      content: prompt,
      files,
      timestamp: Date.now(),
    };

    const assistantMessage: Message = {
      role: "assistant",
      content: "",
      timestamp: Date.now(),
    };

    const history = [...messagesRef.current, userMessage];
    const chat = [...history, assistantMessage];

    messagesRef.current = chat;
    setMessages(chat);

    try {
      setLoading(true);

      await sendChat(
  {
    prompt,
    model,
    history,
    files,
    knowledge_base: knowledgeBase,
    generation_settings: {
      temperature: settings.temperature,
      topP: settings.topP,
      context: settings.context,
    },
  },
  (chunk) => {
          messagesRef.current = messagesRef.current.map((m, i) =>
            i === messagesRef.current.length - 1
              ? {
                  ...m,
                  content: m.content + chunk,
                }
              : m
          );

          setMessages([...messagesRef.current]);
        }
      );

      onMessagesChange(messagesRef.current);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        messagesRef.current[messagesRef.current.length - 1] = {
          role: "assistant",
          content: "⚠️ Something went wrong.",
          timestamp: Date.now(),
        };

        setMessages([...messagesRef.current]);
        onMessagesChange(messagesRef.current);
      }
    } finally {
      setLoading(false);
    }
  }

  function stop() {
    stopGeneration();
    setLoading(false);
  }

  return {
    messages,
    ask,
    stop,
    loading,
  };
}