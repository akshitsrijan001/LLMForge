"use client";

import { useEffect, useRef } from "react";
import { Message } from "../../types/chat";
import MessageBubble from "./MessageBubble";

type ChatWindowProps = {
  messages: Message[];
  loading: boolean;
};

export default function ChatWindow({
  messages,
  loading,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="mt-10 max-w-5xl mx-auto space-y-6">

      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          role={message.role}
          content={message.content}
        />
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-[#221c18] border border-[#2A211B] rounded-2xl px-5 py-4 text-orange-400 animate-pulse">
            🤖 LLMForge is thinking...
          </div>
        </div>
      )}

      <div ref={bottomRef} />

    </div>
  );
}