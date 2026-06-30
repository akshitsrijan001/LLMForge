"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Copy, FileText, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type UploadedFile = {
  name: string;
};

type Props = {
  role: "user" | "assistant";
  content: string;
  files?: UploadedFile[];
  timestamp?: number;
};

function MessageBubble({
  role,
  content,
  files = [],
}: Props) {
  const isUser = role === "user";
  console.log("BUBBLE CONTENT:", JSON.stringify(content));

  const [copied, setCopied] = useState(false);

  const copyMessage = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full">
      {/* Header */}

      <div
        className={`mb-2 flex ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        {isUser ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">
              You
            </span>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
              <User size={14} />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A211B] bg-[#221C18]">
              <Bot size={14} className="text-orange-400" />
            </div>

            <span className="text-sm font-semibold text-white">
              LLMForge
            </span>
          </div>
        )}
      </div>

      {/* Bubble */}

      <div
        className={`rounded-2xl px-7 py-6 ${
          isUser
            ? "ml-auto w-fit max-w-[65%] bg-orange-500 text-white"
            : "max-w-[1100px] border border-[#2A211B] bg-[#221C1B] text-gray-200"
        }`}
      >
        {files.length > 0 && (
          <div className="mb-5 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                  isUser
                    ? "bg-orange-600"
                    : "border border-[#2A211B] bg-[#171311]"
                }`}
              >
                <FileText size={18} />
                <span className="text-sm font-medium">
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {!isUser && (
          <div className="mb-3 flex justify-end">
            <button
              onClick={copyMessage}
              className="flex items-center gap-2 rounded-lg bg-[#2A211B] px-3 py-2 text-sm hover:bg-[#342922]"
            >
              {copied ? (
                <>
                  <Check size={15} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copy
                </>
              )}
            </button>
          </div>
        )}

        <div
          className="
            prose
            prose-lg
            prose-invert
            max-w-none
            leading-8
            text-[17px]
            prose-p:my-3
            prose-headings:mb-4
            prose-li:my-2
            prose-pre:rounded-xl
            prose-pre:border
            prose-pre:border-[#2A211B]
            prose-p:my-2
            prose-pre:my-4
            prose-headings:text-white
            prose-p:text-gray-200
            prose-strong:text-orange-300
            prose-li:text-gray-200
            prose-a:text-orange-400
            prose-code:text-orange-300
            prose-code:before:content-none
            prose-code:after:content-none
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || "");

                if (match) {
                  return (
                    <div className="relative my-4">
                      <button
                        onClick={() =>
                          copyCode(
                            String(children).replace(/\n$/, "")
                          )
                        }
                        className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-[#2A211B] px-2 py-1 text-xs text-gray-300 hover:text-white"
                      >
                        {copied ? (
                          <Check size={14} />
                        ) : (
                          <Copy size={14} />
                        )}

                        {copied ? "Copied" : "Copy"}
                      </button>

                      <SyntaxHighlighter
                        language={match[1]}
                        style={oneDark}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderRadius: "14px",
                          padding: "18px",
                          fontSize: "16px",
                          lineHeight: 1.7,
                        }}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  );
                }

                return (
                  <code className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>

          {!isUser && content === "" && (
          <span className="animate-pulse text-orange-400">
            ▍
          </span>
)}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;