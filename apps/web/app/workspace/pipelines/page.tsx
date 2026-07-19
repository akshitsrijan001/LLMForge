"use client";

import {
  Play,
  Pause,
  Clock3,
  FileText,
  Cpu,
  Activity,
} from "lucide-react";

const pipelines = [
  {
    title: "RAG Pipeline",
    description:
      "Retrieve documents, rerank context, generate answers and evaluate output quality.",
    status: "Running",
    progress: 82,
    model: "Llama 3.1 8B",
    docs: 4178,
    runtime: "2m 14s",
  },
  {
    title: "Knowledge Indexing",
    description:
      "Chunk uploaded documents and build searchable vector embeddings.",
    status: "Completed",
    progress: 100,
    model: "nomic-embed-text",
    docs: 4062,
    runtime: "5m 42s",
  },
  {
    title: "Prompt Benchmark",
    description:
      "Evaluate prompts across multiple local models and compare quality.",
    status: "Queued",
    progress: 12,
    model: "Gemma 3",
    docs: 0,
    runtime: "--",
  },
  {
    title: "Model Comparison",
    description:
      "Compare latency, quality and token usage across different models.",
    status: "Running",
    progress: 47,
    model: "Auto Router",
    docs: 0,
    runtime: "58s",
  },
  {
    title: "Dataset Processing",
    description:
      "Preprocess datasets before fine-tuning or evaluation workflows.",
    status: "Idle",
    progress: 0,
    model: "Python Worker",
    docs: 812,
    runtime: "--",
  },
  {
    title: "Custom Workflow",
    description:
      "Design your own AI pipeline by chaining models and processing steps.",
    status: "Coming Soon",
    progress: 0,
    model: "-",
    docs: 0,
    runtime: "--",
  },
];

export default function PipelinesPage() {
  return (
    <div className="min-h-screen bg-[#0b0a09] text-white p-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold">
          AI <span className="text-orange-500">Pipelines</span>
        </h1>

        <p className="mt-3 max-w-3xl text-white/60">
          Monitor, execute and manage AI workflows. Pipelines combine
          Retrieval-Augmented Generation, prompt engineering, model routing,
          indexing and evaluation into repeatable automation.
        </p>

        <div className="mt-8 grid grid-cols-4 gap-4">

          <StatCard
            title="Active Pipelines"
            value="6"
          />

          <StatCard
            title="Running"
            value="2"
          />

          <StatCard
            title="Documents"
            value="8,240"
          />

          <StatCard
            title="Success Rate"
            value="99.4%"
          />

        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {pipelines.map((pipeline) => (
            <PipelineCard
              key={pipeline.title}
              {...pipeline}
            />
          ))}

        </div>

      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#2A211B] bg-[#171311] p-5">
      <p className="text-xs uppercase tracking-wider text-white/40">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}

function PipelineCard(props: any) {
  return (
    <div className="rounded-2xl border border-[#2A211B] bg-[#171311] p-6 transition hover:border-orange-500">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold">
            {props.title}
          </h2>

          <p className="mt-2 text-sm text-white/60">
            {props.description}
          </p>
        </div>

        <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs text-orange-400">
          {props.status}
        </span>

      </div>

      <div className="mt-6">

        <div className="flex justify-between text-xs text-white/50">
          <span>Progress</span>
          <span>{props.progress}%</span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">

          <div
            className="h-full rounded-full bg-orange-500"
            style={{
              width: `${props.progress}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-sm">

        <Info
          icon={<Cpu size={16} />}
          label="Model"
          value={props.model}
        />

        <Info
          icon={<FileText size={16} />}
          label="Docs"
          value={String(props.docs)}
        />

        <Info
          icon={<Clock3 size={16} />}
          label="Runtime"
          value={props.runtime}
        />

      </div>

      <div className="mt-6 flex gap-3">

        <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black hover:brightness-110">
          <Play size={16} />
          Run
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
          <Pause size={16} />
          Pause
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
          <Activity size={16} />
          Logs
        </button>

      </div>

    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-black/20 p-3">
      <div className="flex items-center gap-2 text-white/50">
        {icon}
        {label}
      </div>

      <div className="mt-2 font-medium">
        {value}
      </div>
    </div>
  );
}