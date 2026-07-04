"use client";

import { useSettings } from "../../../hooks/useSettings";

export default function InfrastructureCard() {

  const {
    ollamaUrl,
    embeddingModel,
    chromaPath,
    setOllamaUrl,
    setEmbeddingModel,
    setChromaPath,
  } = useSettings();

  return (
    <section>
      <h2 className="text-orange-400 uppercase tracking-[0.35em] text-base font-semibold mb-6">
        Core Infrastructure
      </h2>

      <div className="rounded-2xl border border-slate-700 bg-[#142338] p-10 shadow-xl">

        <div className="grid grid-cols-2 gap-10">

          <div>
            <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
              Ollama Instance URL
            </label>

            <input
              value={ollamaUrl}
              onChange={(e) => setOllamaUrl(e.target.value)}
              className="w-full h-14 rounded-xl bg-[#0B1628] border border-[#263248] px-5 text-base text-white outline-none transition focus:border-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
              Active Embedding Model
            </label>

            <select
              value={embeddingModel}
              onChange={(e) => setEmbeddingModel(e.target.value)}
              className="w-full h-14 rounded-xl bg-[#0B1628] border border-[#263248] px-5 text-base text-white outline-none transition focus:border-orange-400"
            >
              <option value="nomic-embed-text:latest">
                nomic-embed-text:latest
              </option>

              <option value="bge-large">
                bge-large
              </option>

              <option value="all-minilm">
                all-minilm
              </option>
            </select>
          </div>

        </div>

        <div className="mt-10">

          <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
            ChromaDB Persistent Path
          </label>

          <input
            value={chromaPath}
            onChange={(e) => setChromaPath(e.target.value)}
            className="w-full h-14 rounded-xl bg-[#0B1628] border border-[#263248] px-5 text-base text-white outline-none transition focus:border-orange-400"
          />

        </div>

      </div>
    </section>
  );
}