"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  BookOpen,
  Bot,
  Database,
  Settings,
  Puzzle,
  Pin,
  Trash2,
} from "lucide-react";
import { ChatSession } from "../../types/session";
import SidebarLogo from "./SidebarLogo";
import SidebarSearch from "./SidebarSearch";
import Link from "next/link";

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

  if (diff < hour)
    return `${Math.floor(diff / minute)}m ago`;

  if (diff < day)
    return `${Math.floor(diff / hour)}h ago`;

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
    .filter((session) =>
      session.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <aside className="w-[340px] bg-[#171311] border-r border-[#2A211B] flex flex-col justify-between h-screen p-5">
      <div>
        <SidebarLogo />

        <button
          onClick={newSession}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          <Plus size={18} />
          New Chat
        </button>

        {/* Search */}
        <SidebarSearch
  value={search}
  onChange={setSearch}
/>

        <h3 className="mb-3 text-sm uppercase tracking-widest text-gray-500">
          Recent Chats
        </h3>

        <div className="space-y-2">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setCurrentId(session.id)}
              className={`group flex items-center justify-between rounded-xl px-3 py-2 cursor-pointer transition ${
                session.id === currentId
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-[#2A211B]"
              }`}
            >
              {editingId === session.id ? (
                <input
                  autoFocus
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
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
                  className="w-full rounded bg-[#2A211B] px-2 py-1 text-sm text-white outline-none"
                />
              ) : (
                <div className="flex flex-1 flex-col overflow-hidden">

    <span className="truncate text-[15px] font-semibold text-white">
        {session.title}
    </span>

    <span className="mt-0.5 text-sm font-medium text-orange-300/90">
        {formatTime(session.updatedAt)}
    </span>

</div>
              )}

              <Pin
              size={15}
              className={`mr-2 transition ${
                session.pinned
                  ? "text-orange-400"
                  : "text-gray-500 hover:text-orange-400"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                togglePin(session.id);
              }}
            />

              <Trash2
                size={15}
                className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition"
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
  icon={<Settings size={18} />}
  title="Settings"
  href="/workspace/settings"
/>
        </div>
      </div>

      <div className="border-t border-[#2A211B] pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
            S
          </div>

          <div>
            <p className="font-medium text-white">
              Srijan
            </p>

            <p className="text-sm text-gray-500">
              Local Developer
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

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
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 transition cursor-pointer ${
          active
            ? "bg-orange-500 text-white"
            : "text-gray-300 hover:bg-[#2A211B] hover:text-white"
        }`}
      >
        {icon}
        <span className="truncate">{title}</span>
      </div>
    </Link>
  );
}