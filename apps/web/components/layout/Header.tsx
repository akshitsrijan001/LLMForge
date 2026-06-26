"use client";

import {
  Circle,
  Share2,
  Download,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 border-b border-[#2A211B] bg-[#171311] flex items-center justify-between px-8">

      {/* Left */}

      <div className="flex items-center gap-8">

        <div className="flex items-center gap-2">

          <Circle
            size={10}
            fill="#22C55E"
            color="#22C55E"
          />

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

      {/* Right */}

      <div className="flex items-center gap-4">

        <button className="flex items-center gap-2 bg-[#221c18] px-5 py-3 rounded-xl hover:bg-[#2A211B] transition">

          <span>Llama 3 (8B)</span>

          <ChevronDown size={22} />

        </button>

        <button className="hover:text-orange-400 transition">
          <Share2 size={20} />
        </button>

        <button className="hover:text-orange-400 transition">
          <Download size={20} />
        </button>

        <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
          S
        </div>

      </div>

    </header>
  );
}