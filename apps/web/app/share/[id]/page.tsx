"use client";

import { use, useEffect, useState } from "react";
import { getSharedChat } from "@/services/api.service";
import ChatWindow from "@/components/chat/ChatWindow";

import type { Message } from "@/types/chat";


export default function SharedChat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSharedChat(id);
        setMessages(
  data.messages.map((m: any): Message => ({
    role: m.role,
    content: m.content,
  }))
);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [id]);

  return (
  <div className="flex min-h-screen bg-[#0b0a09] text-white">
    <main className="mx-auto flex w-full max-w-5xl flex-col">

      <div className="border-b border-white/10 px-8 py-6">
        <h1 className="text-2xl font-bold">
          LLMForge Shared Conversation
        </h1>

        <p className="mt-2 text-sm text-white/50">
          Read-only shared chat
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-8">
        <ChatWindow
          messages={messages}
          loading={false}
        />
      </div>

      <div className="border-t border-white/10 p-6 flex justify-center">
        <button
          className="rounded-xl bg-orange-500 px-5 py-3 font-medium hover:bg-orange-600"
        >
          Continue in LLMForge
        </button>
      </div>

    </main>
  </div>
);}