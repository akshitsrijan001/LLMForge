"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bot,
  User,
  Copy,
  FileText,
  Check,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";

type UploadedFile = {
  name: string;
};

type Props = {
  role: "user" | "assistant";
  content: string;
  files?: UploadedFile[];
  timestamp?: number;
};

export default function MessageBubble({
  role,
  content,
  files = [],
  timestamp,
}: Props) {
  const isUser = role === "user";

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
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.25,
      ease: "easeOut",
    }}
    >
      <div
        className={`flex gap-4 ${
          isUser ? "flex-row-reverse" : "flex-row"
        } max-w-[850px] w-full`}
      >
        {/* Avatar */}

        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg shadow-lg">
              <User size={18} className="text-white" />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg">
              <Bot className="text-white"/>
            </div>
          )}
        </div>

        {/* Message */}

        <div
          className={`flex flex-col ${
            isUser ? "items-end" : "items-start"
          } flex-1`}
        >
          {/* Header */}

          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm font-semibold text-white">
              {isUser ? "You" : "LLMForge"}
            </span>

            {timestamp && (
              <span className="text-xs text-white/35">
                {new Date(timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>

          {/* Bubble */}

          <div
  className={`relative overflow-hidden rounded-2xl transition-all ${
    isUser
      ? "max-w-[700px] bg-orange-500 text-white px-6 py-5 shadow-xl"
      : "w-fit max-w-[700px] border border-[#2B211B] bg-[#221C18] px-7 py-6 shadow-xl shadow-black/20"
  }`}
>
            {/* Copy */}

            {!isUser && (
              <button
                onClick={copyMessage}
                className="
absolute
right-5
top-5
opacity-0
transition
duration-200
group-hover:opacity-100
flex
items-center
gap-2
rounded-lg
border
border-[#3A2B22]
bg-[#2A211B]
px-3
py-2
text-xs
text-gray-300
hover:bg-[#35291F]
hover:text-white
"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            )}

            {/* Files */}

            {files.length > 0 && (
              <div className="mb-6 space-y-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                      isUser
                        ? "border-orange-300/20 bg-orange-600"
                        : "border-[#35291F] bg-[#171311]"
                    }`}
                  >
                    <FileText
                      size={18}
                      className="text-orange-400"
                    />

                    <div>
                      <p className="font-medium">
                        {file.name}
                      </p>

                      <p className="text-xs opacity-60">
                        Attached document
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Markdown */}

            <div
              className="
                prose
                prose-invert
                prose-lg
                max-w-none
                leading-8
                text-[17px]
                prose-p:my-3
                prose-headings:text-white
                prose-headings:mb-4
                prose-strong:text-orange-300
                prose-a:text-orange-400
                prose-li:text-gray-200
                prose-p:text-gray-200
                prose-pre:bg-transparent
                prose-pre:p-0
                prose-pre:m-0
                prose-code:before:content-none
                prose-code:after:content-none
                prose-code:text-orange-300
              "
                        >  <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children }) {
                    const match = /language-(\w+)/.exec(
                      className || ""
                    );

                    if (match) {
                      return (
                        <div className="my-6 overflow-hidden rounded-xl border border-[#35291F] bg-[#161311] shadow-xl shadow-black/20">
                          <div className="flex items-center justify-between border-b border-[#35291F] bg-[#1F1916] px-4 py-2">
                            <span className="text-xs font-medium uppercase tracking-wide text-orange-300">
                              {match[1]}
                            </span>

                            <button
                              onClick={() =>
                                copyCode(
                                  String(children).replace(/\n$/, "")
                                )
                              }
                              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 transition hover:bg-[#2A211B] hover:text-white"
                            >
                              {copied ? (
                                <>
                                  <Check size={13} />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy size={13} />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>

                          <SyntaxHighlighter
                            language={match[1]}
                            style={oneDark}
                            showLineNumbers
                            wrapLongLines
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              borderRadius: 0,
                              padding: "20px",
                              fontSize: "15px",
                              lineHeight: 1.7,
                              background: "#161311",
                            }}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        </div>
                      );
                    }

                    return (
                      <code
                        className="rounded bg-[#2A211B] px-1.5 py-0.5 text-orange-300"
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>

              {!isUser && content === "" && (
                <div className="flex items-center gap-2 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-orange-400"></span>
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-orange-400"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-orange-400"
                    style={{ animationDelay: "300ms" }}
                  ></span>

                  <span className="ml-2 text-sm text-orange-300">
                    Generating response...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}