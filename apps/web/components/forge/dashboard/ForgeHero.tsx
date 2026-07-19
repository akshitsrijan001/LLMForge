"use client";

import { motion } from "framer-motion";
import { Command, Sparkles } from "lucide-react";
import { Counter, StatusPill } from "../common/Primitives";

export function ForgeHero({
  name = "Alex",
}: {
  name?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-8 backdrop-blur-xl"
    >
      {/* Orange glow */}
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle,#ff7a1a 0%,transparent 60%)",
        }}
      />

      {/* Blue glow */}
      <div
        aria-hidden
        className="absolute -left-20 bottom-0 h-60 w-60 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle,#3e8ef7 0%,transparent 70%)",
        }}
      />

      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
        <Sparkles
          size={11}
          className="text-[#ff7a1a]"
        />
        Welcome back
      </div>

      <h1 className="mt-3 text-[42px] font-semibold leading-tight tracking-tight text-white">
        Welcome back to{" "}
        <span className="text-[#ff7a1a]">
          LLMForge
        </span>
        , {name}.
      </h1>

      <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/60">
        Your AI operating system is warm.
        Three pipelines are currently running,
        twelve active threads are processing,
        and your latest evaluation branch is
        performing above baseline.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">

        <StatusPill
          color="#34d399"
          label="All systems · 42ms · FRA1"
        />

        <div className="flex items-center gap-6 text-[12px] text-white/70">

          <Stat
            label="Tokens today"
            value={128420}
          />

          <Stat
            label="Active runs"
            value={3}
          />

          <Stat
            label="Uptime"
            value={99.9}
            format="float1"
            suffix="%"
          />

        </div>

        <button className="ml-auto inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/80 transition hover:bg-white/10">
          <Command size={12} />
          Open command bar
        </button>

      </div>

      {/* Stats */}

      <div className="mt-10 grid grid-cols-4 gap-8 border-t border-white/5 pt-8">

        <HeroStat
          label="Tokens"
          value={128420}
        />

        <HeroStat
          label="Models"
          value={5}
        />

        <HeroStat
          label="Knowledge Bases"
          value={12}
        />

        <HeroStat
          label="Chats"
          value={143}
        />

      </div>
    </motion.section>
  );
}

function HeroStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>

      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </div>

      <div className="mt-2 text-[28px] font-semibold text-white">
        <Counter value={value} />
      </div>

    </div>
  );
}

function Stat({
  label,
  value,
  format,
  suffix,
}: {
  label: string;
  value: number;
  format?: "int" | "compact" | "float1";
  suffix?: string;
}) {
  return (
    <div className="leading-tight">

      <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
        {label}
      </div>

      <div className="mt-0.5 text-[18px] font-semibold text-white">
        <Counter
          value={value}
          format={format}
        />
        {suffix}
      </div>

    </div>
  );
}

export default ForgeHero;