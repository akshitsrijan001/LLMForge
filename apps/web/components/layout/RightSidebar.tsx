"use client";

import {
  SlidersHorizontal,
  FileText,
  X,
  Terminal,
  Trash2,
} from "lucide-react";

import { useSettings } from "../../hooks/useSettings";
import { useKnowledgeBase } from "../../hooks/useKnowledgeBase";
import { useEffect, useState } from "react";
import { getKnowledgeBases } from "../../services/knowledgeBase.service";
import { useMemo } from "react";

export default function RightSidebar() {
  const {
    temperature,
    setTemperature,
    topP,
    setTopP,
    context,
    setContext,
  } = useSettings();

const {
  knowledgeBase,
  setKnowledgeBase,
} = useKnowledgeBase();

const [knowledgeBases, setKnowledgeBases] = useState<
  {
    name: string;
    chunks: number;
  }[]
>([]);

const selectedKB = useMemo(() => {
  return knowledgeBases.find(
    (kb) => kb.name === knowledgeBase
  );
}, [knowledgeBase, knowledgeBases]);

useEffect(() => {
  async function load() {
    const data = await getKnowledgeBases();
    setKnowledgeBases(data);
  }

  load();
}, []);

  return (
    <aside className="w-[300px] h-screen bg-[#171311] border-l border-[#2A211B] flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A211B]">
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-orange-400">
          Control Center
        </h2>

        <button className="text-gray-400 hover:text-white transition">
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-10">

      {/* Knowledge Base */}
  <div>
    <h3 className="mb-3 text-sm font-semibold text-gray-400">
      Knowledge Base
    </h3>

    <select
  value={knowledgeBase}
  onChange={(e) => setKnowledgeBase(e.target.value)}
  className="
    w-full
    rounded-xl
    border
    border-[#2A211B]
    bg-[#221C18]
    px-3
    py-2
    text-white
  "
>
  {knowledgeBases.map((kb) => (
    <option key={kb.name} value={kb.name}>
      {kb.name} ({kb.chunks} chunks)
    </option>
  ))}
</select>
  </div>

        {/* Temperature */}
        <div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-400">Temperature</span>
            <span className="text-orange-400 font-semibold">
              {temperature.toFixed(2)}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={temperature}
            onChange={(e) =>
              setTemperature(Number(e.target.value))
            }
            className="w-full accent-orange-500"
          />
        </div>

        {/* Top P */}
        <div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-400">Top P</span>
            <span className="text-orange-400 font-semibold">
              {topP.toFixed(2)}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={topP}
            onChange={(e) =>
              setTopP(Number(e.target.value))
            }
            className="w-full accent-orange-500"
          />
        </div>

        {/* Context Window */}
        <div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-400">
              Context Window
            </span>

            <span className="text-orange-400 font-semibold">
              {context}
            </span>
          </div>

          <input
            type="range"
            min={1024}
            max={32768}
            step={1024}
            value={context}
            onChange={(e) =>
              setContext(Number(e.target.value))
            }
            className="w-full accent-orange-500"
          />
        </div>

        {/* Active Resources */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-4">
            Active Resources
          </h3>

          <Resource name="project_specs.pdf" />
          <Resource name="api_docs.pdf" />
        </div>

        {/* Engine Log */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-4">
            Engine Log
          </h3>

          <div className="rounded-2xl bg-[#221C1B] border border-[#2A211B] p-5">

            <div className="flex items-center gap-2 mb-3">
              <Terminal
                size={16}
                className="text-orange-400"
              />

              <span className="text-sm font-semibold">
                LLMForge Engine
              </span>
            </div>

            <div className="space-y-3 text-sm">

  <p className="text-green-400">
    🟢 Ollama Connected
  </p>

  <p className="text-green-400">
    🟢 API Online
  </p>

  <p className="text-orange-400">
    📚 KB: {knowledgeBase}
  </p>

  <p className="text-orange-400">
    🧠 Chunks: {selectedKB?.chunks ?? 0}
  </p>

  <p className="text-blue-400">
    ⚡ Forge Ready
  </p>

</div>

          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="p-6 border-t border-[#2A211B]">

        <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/30 py-3 text-red-400 hover:bg-red-500/10 transition">

          <Trash2 size={18} />

          Purge Context

        </button>

      </div>

    </aside>
  );
}

function Resource({
  name,
}: {
  name: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#221C1B] border border-[#2A211B] px-4 py-3 mb-3 hover:border-orange-500 transition">

      <div className="flex items-center gap-3">

        <FileText
          size={18}
          className="text-orange-400"
        />

        <span className="text-sm text-white">
          {name}
        </span>

      </div>

      <button className="text-gray-500 hover:text-red-400 transition">

        <X size={16} />

      </button>

    </div>
  );
}