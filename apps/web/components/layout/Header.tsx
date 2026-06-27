"use client";

import {
  Circle,
  Share2,
  Download,
} from "lucide-react";

type HeaderProps = {
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
};

export default function Header({
  model,
  setModel,
}: HeaderProps) {
  return (
    <header className="h-20 border-b border-[#2A211B] bg-[#171311] flex items-center justify-between px-8">

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Circle size={10} fill="#22C55E" color="#22C55E" />

          <span className="text-sm text-green-400 font-medium">
            OLLAMA LIVE
          </span>
        </div>

        <div>
          <p className="text-base text-gray-500 uppercase">
            Session
          </p>

          <p className="text-white font-medium">
            New Forge Engine
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="bg-[#221C18] border border-[#2A211B] rounded-xl px-4 py-3 text-white outline-none hover:border-orange-500 transition"
        >
          <option value="auto">⚡ Auto</option>
          <option value="gemma3:1b">⚡ Fast (Gemma 3)</option>
          <option value="qwen2.5-coder:3b">💻 Coder</option>
          <option value="phi3:mini">🧠 Reasoning</option>
          <option value="llama3.1:8b">🚀 Powerful</option>
        </select>

        <button className="hover:text-orange-400">
          <Share2 size={20} />
        </button>

        <button className="hover:text-orange-400">
          <Download size={20} />
        </button>

        <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
          S
        </div>

      </div>
    </header>
  );
}