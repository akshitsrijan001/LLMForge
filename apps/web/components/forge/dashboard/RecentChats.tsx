"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PulseDot } from "../common/Primitives";

const chats = [
  {
    title: "Refactor the rerank scoring loop",
    model: "claude-3.5-sonnet",
    color: "#ff7a1a",
    time: "2m",
    live: true,
  },
  {
    title: "Explain the RAG evaluation harness",
    model: "llama-3.1-70b",
    color: "#a76cf2",
    time: "18m",
  },
  {
    title: "Draft release notes for v3.0",
    model: "gpt-4o",
    color: "#34d399",
    time: "1h",
  },
  {
    title: "Debug embedding drift in Notion source",
    model: "claude-3.5-sonnet",
    color: "#ff7a1a",
    time: "3h",
  },
  {
    title: "Turn this SQL into a migration",
    model: "deepseek-v3",
    color: "#3e8ef7",
    time: "yesterday",
  },
];

export function RecentChats() {
  return (
    <section className="rounded-[24px] border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Recent chats
          </div>

          <h3 className="mt-1 text-[17px] font-semibold text-white">
            Threads
          </h3>
        </div>

        <button className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-white/40 hover:text-[#ff7a1a]">
          All <ArrowUpRight size={11} />
        </button>
      </header>

      <ul className="space-y-1">
        {chats.map((c, i) => (
          <motion.li
            key={c.title}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.04 * i,
              type: "spring",
              stiffness: 260,
              damping: 26,
            }}
          >
            <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]">
              <PulseDot color={c.color} size={7} />

              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] text-white">
                  {c.title}
                </div>

                <div className="mt-0.5 font-mono text-[10px] text-white/40">
                  {c.model} · {c.live ? "streaming" : "idle"}
                </div>
              </div>

              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {c.time}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default RecentChats;