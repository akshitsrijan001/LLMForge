// =========================
// Sidebar.tsx (PART 1/2)
// Replace from the top of the file
// until JUST BEFORE:
// type SidebarItemProps = {
// =========================

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  BookOpen,
  Bot,
  Database,
  Settings,
  Pin,
  Trash2,
  Workflow,
} from "lucide-react";

import { ChatSession } from "../../types/session";
import SidebarLogo from "./SidebarLogo";
import SidebarSearch from "./SidebarSearch";

type SidebarProps = {
  sessions: ChatSession[];
  currentId: string;
  setCurrentId: (id: string) => void;
  newSession: () => void;
  deleteSession: (id: string) => void;
  renameSession: (id: string, title: string) => void;
  togglePin: (id: string) => void;
};

function formatTime(timestamp: number) {
  const now = Date.now();
  const diff = now - timestamp;

  const minute = 60000;
  const hour = minute * 60;
  const day = hour * 24;

  if (diff < minute) return "Just now";
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;

  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function Sidebar({
  sessions,
  currentId,
  setCurrentId,
  newSession,
  deleteSession,
  renameSession,
  togglePin,
}: SidebarProps) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const filteredSessions = sessions
    .filter((s) =>
      s.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <aside className="flex h-screen w-[340px] flex-col justify-between border-r border-[#2A211B] bg-[#171311] p-5">

      <div>

        <SidebarLogo />

        <button
          onClick={newSession}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-400"
        >
          <Plus size={18} />
          New Chat
        </button>

        <SidebarSearch
          value={search}
          onChange={setSearch}
        />

        <h3 className="mb-3 text-xs uppercase tracking-[0.25em] text-white/35">
          Recent Chats
        </h3>

        <div className="space-y-2">

          {filteredSessions.map((session) => (

            <div
              key={session.id}
              onClick={() => setCurrentId(session.id)}
              className={`group flex cursor-pointer items-center justify-between rounded-2xl border px-3 py-3 transition-all ${
                session.id === currentId
                  ? "border-orange-500/40 bg-orange-500/10"
                  : "border-transparent hover:border-[#35291F] hover:bg-[#221C18]"
              }`}
            >

              {editingId === session.id ? (

                <input
                  autoFocus
                  value={editingTitle}
                  onChange={(e) =>
                    setEditingTitle(e.target.value)
                  }
                  onBlur={() => {
                    renameSession(session.id, editingTitle);
                    setEditingId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      renameSession(session.id, editingTitle);
                      setEditingId(null);
                    }

                    if (e.key === "Escape") {
                      setEditingId(null);
                    }
                  }}
                  className="w-full rounded-xl bg-[#2A211B] px-2 py-1 text-white outline-none"
                />

              ) : (

                <div className="flex flex-1 flex-col overflow-hidden">

                  <span className="truncate font-semibold text-white">
                    {session.title}
                  </span>

                  <span className="mt-1 text-xs text-orange-300/80">
                    {formatTime(session.updatedAt)}
                  </span>

                </div>

              )}

              <Pin
                size={15}
                className={`mr-3 transition ${
                  session.pinned
                    ? "text-orange-400"
                    : "text-white/30 hover:text-orange-400"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(session.id);
                }}
              />

              <Trash2
                size={15}
                className="opacity-0 transition group-hover:opacity-100 hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(session.id);
                }}
              />

            </div>

          ))}

        </div>

        <div className="mt-10 space-y-2">

          <SidebarItem
            icon={<BookOpen size={18} />}
            title="Knowledge Bases"
            href="/workspace/knowledge-base"
          />

          <SidebarItem
            icon={<Database size={18} />}
            title="Models"
            href="/workspace/models"
          />

          <SidebarItem
            icon={<Bot size={18} />}
            title="Playground"
            href="/workspace/playground"
          />

          <SidebarItem
            icon={<BookOpen size={18} />}
            title="Guide"
            href="/workspace/guide"
          />

          <SidebarItem
            icon={<Workflow size={18} />}
            title="Pipelines"
            href="/workspace/pipelines"
          />

          <SidebarItem
            icon={<Settings size={18} />}
            title="Settings"
            href="/workspace/settings"
          />

        </div>

      </div>

      <div className="border-t border-[#2A211B] pt-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-700 font-bold text-white">
            S
          </div>

          <div>

            <p className="font-medium text-white">
              Srijan
            </p>

            <p className="text-sm text-white/40">
              Local Developer
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}

// =========================
// Sidebar.tsx (PART 2/2)
// Append this BELOW the export default Sidebar
// =========================

type SidebarItemProps = {
  icon?: React.ReactNode;
  title: string;
  href?: string;
  active?: boolean;
};

function SidebarItem({
  icon,
  title,
  href = "#",
  active = false,
}: SidebarItemProps) {
  return (
    <Link href={href}>
      <div
        className={`group flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-3 py-3 transition-all ${
          active
            ? "border-orange-500/40 bg-orange-500/10 text-orange-300"
            : "border-transparent text-white/70 hover:border-[#35291F] hover:bg-[#221C18] hover:text-white"
        }`}
      >
        <span className="text-orange-400 transition group-hover:scale-105">
          {icon}
        </span>

        <span className="flex-1 truncate font-medium">
          {title}
        </span>
      </div>
    </Link>
  );
}