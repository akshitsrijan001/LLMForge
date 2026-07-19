"use client";

import {
  Search,
  Command,
  Bell,
  GitBranch,
} from "lucide-react";

import { StatusPill } from "../common/Primitives";

export default function ForgeHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-5 border-b border-white/5 bg-black/40 px-6 backdrop-blur-xl">

      {/* Breadcrumb */}

      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/40">

        <GitBranch size={13} />

        <span className="text-white/80">
          main
        </span>

        <span>/</span>

        <span>dashboard</span>

      </div>

      {/* Search */}

      <div className="mx-auto w-full max-w-xl">

        <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2">

          <Search
            size={15}
            className="text-white/40"
          />

          <input
            placeholder="Search models, chats, knowledge..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
          />

          <kbd className="flex items-center gap-1 rounded-md border border-white/10 bg-black/30 px-2 py-1 font-mono text-[10px] text-white/40">

            <Command size={10} />

            K

          </kbd>

        </label>

      </div>

      <StatusPill
        color="#34d399"
        label="All systems · 42ms"
      />

      <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]">

        <Bell
          size={16}
          className="text-white/70"
        />

        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-orange-500" />

      </button>

    </header>
  );
}