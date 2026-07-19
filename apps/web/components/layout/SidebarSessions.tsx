"use client";

import { MessageSquarePlus, Pin, Trash2 } from "lucide-react";
import { type ChatSession } from "../../types/session";

type SidebarSessionsProps = {
  sessions: ChatSession[];
  currentId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
};

export default function SidebarSessions({
  sessions,
  currentId,
  onSelect,
  onNew,
  onDelete,
  onTogglePin,
}: SidebarSessionsProps) {
  return (
    <section>
      <button
        type="button"
        onClick={onNew}
        className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
      >
        <MessageSquarePlus size={16} />
        New chat
      </button>
      <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-widest text-white/35">Recent chats</p>
      <div className="space-y-1">
        {sessions.map((session) => {
          const active = session.id === currentId;
          return (
            <button
              type="button"
              key={session.id}
              onClick={() => onSelect(session.id)}
              className={`group flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                active ? "bg-white/[0.09] text-white" : "text-white/60 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm">{session.title}</span>
                <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-wider text-white/30">
                  {new Date(session.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </span>
              </span>
              <span
                role="button"
                tabIndex={0}
                aria-label={`Pin ${session.title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onTogglePin(session.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.stopPropagation();
                    onTogglePin(session.id);
                  }
                }}
                className={session.pinned ? "text-orange-300" : "opacity-0 transition group-hover:opacity-100"}
              >
                <Pin size={13} />
              </span>
              <span
                role="button"
                tabIndex={0}
                aria-label={`Delete ${session.title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete(session.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.stopPropagation();
                    onDelete(session.id);
                  }
                }}
                className="opacity-0 transition hover:text-rose-300 group-hover:opacity-100"
              >
                <Trash2 size={13} />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
