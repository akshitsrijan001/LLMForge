"use client";

import { useState } from "react";
import {
  Paperclip,
  Mic,
  SendHorizontal,
} from "lucide-react";

type ChatInputProps = {
  ask: (prompt: string, model: string) => Promise<void>;
};

export default function ChatInput({ ask }: ChatInputProps) {
  const [prompt, setPrompt] = useState("");

  async function send() {
    if (!prompt.trim()) return;

    await ask(prompt, "llama3.1:8b");
    setPrompt("");
  }

  return (
    <div className="border-t border-[#2A211B] bg-[#171311] p-6">

      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-4 rounded-2xl border border-[#2A211B] bg-[#221C1B] px-6 h-20">

          {/* Attachment */}
          <button className="text-gray-500 hover:text-orange-400 transition">
            <Paperclip size={24} />
          </button>

          {/* Input */}
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Message LLMForge..."
            className="flex-1 bg-transparent outline-none text-lg text-white placeholder:text-gray-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />

          {/* Mic */}
          <button className="text-gray-500 hover:text-orange-400 transition">
            <Mic size={24} />
          </button>

          {/* Send */}
          <button
            onClick={send}
            className="h-14 w-14 rounded-xl bg-orange-500 hover:bg-orange-400 transition flex items-center justify-center"
          >
            <SendHorizontal size={24} />
          </button>

        </div>

      </div>

    </div>
  );
}