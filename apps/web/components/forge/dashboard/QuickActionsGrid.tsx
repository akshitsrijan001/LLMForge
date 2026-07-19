"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  Database,
  FlaskConical,
  MessageSquarePlus,
} from "lucide-react";

const actions = [
  {
    id: "chat",
    title: "New Chat",
    shortcut: "CTRL N",
    description: "Start a focused conversation with any local model.",
    color: "#ff7a1a",
    icon: MessageSquarePlus,
    href: "/workspace/chat",
  },
  {
    id: "kb",
    title: "Knowledge Base",
    shortcut: "CTRL K",
    description: "Manage documents and RAG collections.",
    color: "#3e8ef7",
    icon: Database,
    href: "/workspace/knowledge-base",
  },
  {
    id: "playground",
    title: "Playground",
    shortcut: "CTRL P",
    description: "Tune prompts and compare your models.",
    color: "#a76cf2",
    icon: FlaskConical,
    href: "/workspace/playground",
  },
  {
    id: "models",
    title: "Models",
    shortcut: "CTRL M",
    description: "Review the local models available to Forge.",
    color: "#34d399",
    icon: Boxes,
    href: "/workspace/models",
  },
];

export function QuickActionsGrid() {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Quick actions
          </div>
          <h2 className="mt-1 text-xl font-semibold text-white">Jump back into work</h2>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-widest text-white/30 sm:block">
          Your workspace, one click away
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.45 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] text-left backdrop-blur-xl transition-all hover:border-white/10"
            >
              <Link href={item.href} className="block p-5">
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-60"
                  style={{
                    background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)`,
                  }}
                />

                <div className="flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10"
                    style={{ color: item.color, background: `${item.color}20` }}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {item.shortcut}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <h3 className="text-[15px] font-semibold text-white">{item.title}</h3>
                  <ArrowUpRight
                    size={13}
                    className="text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <p className="mt-2 text-[12px] leading-6 text-white/50">{item.description}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActionsGrid;
