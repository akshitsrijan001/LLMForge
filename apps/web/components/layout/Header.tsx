"use client";

import {
  Circle,
  Share2,
  MessageSquareText,
} from "lucide-react";
import ModelSelector from "../chat/ModelSelector";

type HeaderProps = {
  model: string;
  onModelChange: (model: string) => void;
  models?: string[];
  sessionTitle?: string;
  onShare?: () => void;
};

export default function Header({
  model,
  onModelChange,
  models,
  sessionTitle = "New conversation",
  onShare,
}: HeaderProps) {
  return (
    <header className="flex min-h-20 items-center justify-between gap-5 border-b border-white/[0.06] bg-black/35 px-5 py-3 backdrop-blur-xl sm:px-8">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-orange-400/20 bg-orange-500/10 text-orange-300">
            <MessageSquareText size={14} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
            Forge chat
          </span>
        </div>
        <p className="mt-1 truncate text-sm font-medium text-white sm:text-base">
          {sessionTitle}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-300 sm:flex">
          <Circle size={7} fill="currentColor" />
          Ollama live
        </div>

        <ModelSelector value={model} onChange={onModelChange} models={models} />

        <button
  type="button"
  onClick={onShare}
  title="Share conversation"
  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/65 transition hover:border-orange-400/35 hover:bg-orange-400/10 hover:text-orange-300"
>
  <Share2 size={20} />
</button>
      </div>
    </header>
  );
}
