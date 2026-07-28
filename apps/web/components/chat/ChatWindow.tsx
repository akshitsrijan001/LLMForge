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
    <div className="flex-1 overflow-y-auto w-full max-w-[1600px] mx-auto flex flex-col gap-7 px-12 pt-10 pb-36">

      {messages.map((message, index) => (
        <MessageBubble
          key={`${message.role}-${index}`}
          role={message.role}
          content={message.content}
          files={message.files}
          timestamp={message.timestamp}
          images={message.images}
          sources={message.sources}
        />
      ))}

      {loading &&
        messages.length > 0 &&
        messages[messages.length - 1]?.content === "" && (
          <div className="flex justify-start">
            <div className="flex items-center gap-3 rounded-2xl border border-[#2A211B] bg-[#171311] px-5 py-4 shadow-lg">
              <div className="h-3 w-3 rounded-full bg-orange-500 animate-pulse" />

              <div>
                <p className="font-medium text-white">
                  LLMForge is contemplating...
                </p>

                <p className="text-sm text-gray-400">
                  Please wait a few seconds.
                </p>
              </div>
            </div>
          </div>
        )}

      <div ref={bottomRef} />
    </div>
  );
}