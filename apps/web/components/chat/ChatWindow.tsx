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
    block: "end",
  });
}, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto w-full max-w-[1500px] mx-auto flex flex-col gap-12 px-12 pt-16 pb-40">

      {messages.map((message, index) => (
  <MessageBubble
    key={index}
    role={message.role}
    content={message.content}
    files={message.files}
    timestamp={message.timestamp}
  />
))}

      {
  loading &&
  messages.length > 0 &&
  messages[messages.length - 1]?.content === "" && (
    <div className="flex justify-start">
      <div className="bg-[#221c18] border border-[#2A211B] rounded-2xl px-7 py-5 text-lg text-orange-400 animate-pulse">
        <div className="flex items-center gap-3 rounded-xl bg-[#221C18] border border-[#2A211B] px-5 py-4 w-fit">
          <div className="h-3 w-3 rounded-full bg-orange-500 animate-pulse" />
          <div className="text-gray-300">
            🤖 LLMForge is contemplating...
          </div>
        </div>
      </div>
    </div>
  )
}

      <div ref={bottomRef} />

    </div>
  );
}