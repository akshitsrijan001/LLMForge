"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  GitBranch,
  Play,
} from "lucide-react";

import { PulseDot } from "../common/Primitives";
import { TelemetryGraph } from "./TelemetryGraph";
import Link from "next/link";

export function ContinueWorking() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -3,
        scale: 1.01,
      }}
      className="group relative overflow-hidden rounded-[28px] border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl"
    >
      {/* Background Glow */}

      <div
        aria-hidden
        className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle,#ff7a1a 0%,transparent 60%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at top right,rgba(255,122,26,.12),transparent 50%)",
        }}
      />

      {/* Header */}

      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
        <Clock size={11} />
        Resume workspace · 4 minutes ago
      </div>

      <h2 className="mt-5 text-[34px] font-semibold leading-tight text-white">
        RAG pipeline for{" "}
        <span className="text-[#ff7a1a]">
          product-docs-v2
        </span>
      </h2>

      <p className="mt-4 max-w-xl text-[14px] leading-7 text-white/60">
        You were indexing 3,412 documentation
        chunks from Notion. The latest rerank
        evaluation improved recall by 12.8%
        while keeping latency below target.
      </p>

      {/* Meta */}

      <div className="mt-6 flex flex-wrap items-center gap-5 font-mono text-[11px] text-white/45">

        <span className="flex items-center gap-2">
          <GitBranch
            size={12}
            className="text-blue-400"
          />
          feat/rerank_v3
        </span>

        <span className="flex items-center gap-2">
          <PulseDot
            color="#34d399"
            size={6}
          />
          indexing · 78%
        </span>

        <span>
          llama-3.1-70b
        </span>

        <span>
          nomic-embed-v1.5
        </span>

      </div>

      {/* Live Graph */}

      <div className="mt-8 rounded-2xl border border-white/5 bg-black/20 p-5">

        <div className="flex items-center justify-between">

          <div>

            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Throughput
            </div>

            <div className="mt-1 text-2xl font-semibold">
              1,284
            </div>

            <div className="font-mono text-[11px] text-white/40">
              chunks / minute
            </div>

          </div>

          <div className="text-right">

            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Latency
            </div>

            <div className="mt-1 text-2xl font-semibold">
              128
            </div>

            <div className="font-mono text-[11px] text-white/40">
              ms
            </div>

          </div>

        </div>

        <div className="mt-5">

          <TelemetryGraph
            data={[
              24,
              32,
              28,
              40,
              38,
              52,
              44,
              60,
              55,
              68,
              62,
              74,
              70,
              82,
              78,
            ]}
            color="#ff7a1a"
            width={620}
            height={80}
            isLive
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-7 flex flex-wrap items-center gap-3">

        <Link href="/workspace/pipelines">
  <button className="inline-flex items-center gap-2 rounded-xl bg-[#ff7a1a] px-4 py-2 text-[13px] font-semibold text-black transition hover:brightness-110">
    <Play
      size={12}
      fill="currentColor"
    />

    Resume Run
  </button>
</Link>

        <Link href="/workspace/playground">
  <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] text-white/80 transition hover:bg-white/[0.08]">
    Open in Playground

    <ArrowUpRight size={14} />
  </button>
</Link>
      </div>

    </motion.article>
  );
}

export default ContinueWorking;