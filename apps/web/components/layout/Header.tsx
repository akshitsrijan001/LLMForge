// apps/web/components/layout/Header.tsx
// COMPLETE FILE

"use client";

import { useState } from "react";
import {
  Circle,
  MessageSquareText,
  Settings,
  Share2,
} from "lucide-react";

import ModelSelector from "../chat/ModelSelector";
import SettingsDrawer from "../chat/SettingsDrawer";

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
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[#2A211B] bg-[#0f0d0b]/90 px-8 backdrop-blur-xl">

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">
              <MessageSquareText
                size={15}
                className="text-orange-400"
              />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-300/70">
              Forge Chat
            </span>

          </div>

          <h2 className="mt-2 truncate text-lg font-semibold text-white">
            {sessionTitle}
          </h2>

        </div>

        <div className="flex items-center gap-3">

          <div className="hidden items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 lg:flex">

            <Circle
              size={8}
              fill="currentColor"
              className="text-emerald-400"
            />

            <span className="text-xs font-medium text-emerald-300">
              Ollama Live
            </span>

          </div>

          <ModelSelector
            value={model}
            onChange={onModelChange}
            models={models}
          />

          <button
            onClick={() => setSettingsOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#35291F] bg-[#171311] text-white/70 transition hover:border-orange-500 hover:bg-[#221C18] hover:text-orange-300"
          >
            <Settings size={18} />
          </button>

          <button
            onClick={onShare}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#35291F] bg-[#171311] text-white/70 transition hover:border-orange-500 hover:bg-[#221C18] hover:text-orange-300"
          >
            <Share2 size={18} />
          </button>

        </div>

      </header>

      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}