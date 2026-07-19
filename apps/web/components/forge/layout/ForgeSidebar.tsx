"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Boxes,
  Bot,
  ChevronDown,
  Database,
  FlaskConical,
  Home,
  MessageSquare,
  Settings,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/workspace/chat", icon: MessageSquare, label: "Chat" },
  { href: "/workspace/knowledge-base", icon: Database, label: "Knowledge" },
  { href: "/workspace/models", icon: Boxes, label: "Models" },
  { href: "/workspace/playground", icon: FlaskConical, label: "Playground" },
];

const futureItems = [
  { icon: Workflow, label: "Pipelines" },
  { icon: Bot, label: "Agents" },
  { icon: Activity, label: "Telemetry" },
];

export default function ForgeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[252px] shrink-0 flex-col border-r border-white/[0.06] bg-black/30 px-3 py-5 backdrop-blur-xl">
      <Link
        href="/"
        className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition hover:border-orange-400/30 hover:bg-white/[0.06]"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 font-bold shadow-lg shadow-orange-500/20">
          LF
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-white">LLMForge</div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Personal workspace
          </div>
        </div>
        <ChevronDown size={14} className="text-white/40" />
      </Link>

      <div className="mb-3 px-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
        Workspace
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const selected = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <motion.div key={item.href} whileHover={{ x: 3 }} transition={{ duration: 0.16 }}>
              <Link
                href={item.href}
                className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm transition ${
                  selected
                    ? "border border-orange-500/25 bg-orange-500/15 text-orange-300 shadow-sm shadow-orange-950/20"
                    : "text-white/65 hover:bg-white/[0.055] hover:text-white"
                }`}
              >
                <Icon size={17} />
                <span className="flex-1">{item.label}</span>
                {item.label === "Chat" && (
                  <span className="rounded-md bg-orange-400/15 px-1.5 py-0.5 font-mono text-[9px] text-orange-300">
                    LIVE
                  </span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="my-5 border-t border-white/[0.06]" />

      <div className="space-y-1">
        {futureItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm text-white/28"
              title={`${item.label} is coming soon`}
            >
              <Icon size={16} />
              <span className="flex-1">{item.label}</span>
              <span className="font-mono text-[8px] uppercase tracking-wider">Soon</span>
            </div>
          );
        })}
      </div>

      <div className="mt-auto">
        <Link
          href="/workspace/settings"
          className="mb-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/65 transition hover:bg-white/[0.055] hover:text-white"
        >
          <Settings size={17} />
          Settings
        </Link>

        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 font-semibold">
            S
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-white">Srijan</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">Builder</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
