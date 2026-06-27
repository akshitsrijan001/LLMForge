"use client";

import { useState, useRef } from "react";
import {
  Paperclip,
  Mic,
  SendHorizontal,
  Loader2,
} from "lucide-react";

type ChatInputProps = {
  ask: (prompt: string, model: string) => Promise<void>;
  loading?: boolean;
  model: string;
};

export default function ChatInput({
  ask,
  loading = false,
  model,
}: ChatInputProps) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resizeTextarea() {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  async function send() {
    if (!prompt.trim() || loading) return;

    await ask(prompt, model);

    setPrompt("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  return (
    <div className="border-t border-[#2A211B] bg-[#171311] p-6">

      <div className="mx-auto max-w-5xl">

        <div className="flex items-end gap-3 rounded-3xl border border-[#2A211B] bg-[#221C18] px-5 py-4 shadow-lg">

          <Paperclip
            size={22}
            className="cursor-pointer text-gray-500 hover:text-orange-400 transition"
          />

          <textarea
            ref={textareaRef}
            rows={1}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              resizeTextarea();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            onInput={(e) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height =
        e.currentTarget.scrollHeight + "px";
}}
            placeholder="Message LLMForge..."
            className="max-h-48 flex-1 resize-none overflow-y-auto bg-transparent text-lg text-white outline-none placeholder:text-gray-500"
          />

          <Mic
            size={20}
            className="cursor-pointer text-gray-500 hover:text-orange-400 transition"
          />

          <button
    onClick={send}
    disabled={loading}
    className={`rounded-xl p-3 transition ${
        loading
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-400"
    }`}
>
    {loading ? (
        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    ) : (
        <SendHorizontal size={18} />
    )}
</button>

        </div>

        <p className="mt-3 text-center text-sm text-gray-500">
          Enter to send • Shift + Enter for new line
        </p>

      </div>

    </div>
  );
}