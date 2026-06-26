"use client";

import {
  Paperclip,
  Mic,
  SendHorizontal,
} from "lucide-react";

export default function ChatInput() {
  return (
    <div className="border-t border-[#2A211B] bg-[#171311] p-6">

      <div className="max-w-5xl mx-auto flex items-center gap-4 rounded-2xl border border-[#2A211B] bg-[#221c18] px-5 py-4">

        <Paperclip className="text-gray-500" />

        <input
          className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
          placeholder="Message LLMForge..."
        />

        <Mic className="text-gray-500" />

        <button className="bg-orange-500 hover:bg-orange-400 transition rounded-xl p-3">
          <SendHorizontal />
        </button>

      </div>

    </div>
  );
}