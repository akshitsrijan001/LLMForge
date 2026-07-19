"use client";

import { useState, useRef } from "react";
import {
  X,
  Paperclip,
  Mic,
  SendHorizontal,
  Square,
} from "lucide-react";

import { uploadFile } from "../../services/upload.service";

type UploadedFile = {
  name: string;
  path: string;
  text: string;
};

type ChatInputProps = {
  ask: (
    prompt: string,
    model: string,
    files: UploadedFile[]
  ) => Promise<void>;

  stop: () => void;

  loading?: boolean;

  model: string;
  knowledgeBase?: string;
};

export default function ChatInput({
  ask,
  stop,
  loading = false,
  model,
  knowledgeBase = "default",
}: ChatInputProps) {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resizeTextarea() {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = e.target.files;

    if (!selected) return;

    const uploaded: UploadedFile[] = [...files];

    for (const file of Array.from(selected)) {
      try {
        const res = await uploadFile(file, knowledgeBase);

        uploaded.push({
          name: res.filename,
          path: res.path,
          text: res.text,
        });
      } catch (err) {
        console.error(err);
      }
    }

    setFiles(uploaded);
  }

  async function send() {
    if (!prompt.trim() || loading) return;

    await ask(
  prompt,
  model,
  files
);

    setPrompt("");
    setFiles([]);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

return (
  <div className="sticky bottom-0 z-20 border-t border-[#2A211B] bg-[#171311]/95 backdrop-blur p-6">
    <div className="mx-auto max-w-5xl">
      <div className="relative flex items-end gap-3 rounded-3xl border border-[#2A211B] bg-[#221C18] px-5 py-4 shadow-lg">

        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={handleUpload}
        />

        <Paperclip
          size={22}
          className="cursor-pointer text-gray-500 hover:text-orange-400 transition"
          onClick={() => fileInputRef.current?.click()}
        />

        {files.length > 0 && (
          <div className="absolute -top-16 left-4 flex gap-2 flex-wrap">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg border border-orange-500 bg-[#2A211B] px-3 py-2"
              >
                <span className="text-sm">📄 {file.name}</span>

                <button onClick={() => removeFile(index)}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

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
          onClick={loading ? stop : send}
          className={`rounded-xl p-3 transition ${
            loading
              ? "bg-red-600 hover:bg-red-500"
              : "bg-orange-500 hover:bg-orange-400"
          }`}
        >
          {loading ? <Square size={18} /> : <SendHorizontal size={18} />}
        </button>
      </div>

      <p className="mt-3 text-center text-sm text-gray-500">
        Enter to send • Shift + Enter for new line
      </p>
    </div>
  </div>
);
}
