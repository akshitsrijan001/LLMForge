"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Copy } from "lucide-react";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({
  role,
  content,
}: Props) {
  const isUser = role === "user";

  return (
    <div className="w-full">

      {/* Header */}

      <div
        className={`flex items-center gap-3 mb-3 ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        {!isUser ? (
          <>
            <div className="h-10 w-10 rounded-full bg-[#221C18] border border-[#2A211B] flex items-center justify-center">
              <Bot size={18} className="text-orange-400" />
            </div>

            <span className="font-semibold text-white text-lg">
              LLMForge
            </span>
          </>
        ) : (
          <>
            <span className="font-semibold text-white text-lg">
              You
            </span>

            <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
              <User size={18} />
            </div>
          </>
        )}
      </div>

      {/* Bubble */}

      <div
        className={`rounded-3xl px-8 py-6 overflow-x-auto ${
          isUser
            ? "ml-auto max-w-3xl bg-orange-500 text-white"
            : "max-w-5xl bg-[#221C18] border border-[#2A211B] text-gray-200"
        }`}
      >
        <div
          className="
            prose
            prose-invert
            max-w-none
            text-lg
            leading-8

            prose-headings:text-white
            prose-p:text-gray-200
            prose-strong:text-orange-300
            prose-a:text-orange-400
            prose-li:text-gray-200

            prose-code:text-orange-300
            prose-code:before:content-none
            prose-code:after:content-none

            prose-pre:bg-[#171311]
            prose-pre:border
            prose-pre:border-[#2A211B]
            prose-pre:rounded-xl
            prose-pre:p-5
            prose-pre:overflow-x-auto
            prose-pre:text-gray-100
          "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {!isUser && (
        <button
          onClick={() => navigator.clipboard.writeText(content)}
          className="mt-3 flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition"
        >
          <Copy size={15} />
          Copy
        </button>
      )}
    </div>
  );
}