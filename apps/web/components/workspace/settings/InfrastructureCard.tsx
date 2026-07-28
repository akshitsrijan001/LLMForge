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
    <section className="rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-8 shadow-2xl shadow-black/20">

      <div className="mb-8">

        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-orange-300/70">
          Infrastructure
        </p>

        <h2 className="text-2xl font-bold text-white">
          Core Infrastructure
        </h2>

        <p className="mt-2 text-white/45">
          Configure your local inference server and vector database.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <div>

          <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Ollama Instance URL
          </label>

          <input
            value={ollamaUrl}
            onChange={(e) => setOllamaUrl(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/10 bg-[#12100e] px-4 text-white outline-none transition focus:border-orange-500"
          />

        </div>

        <div>

          <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Embedding Model
          </label>

          <select
            value={embeddingModel}
            onChange={(e) => setEmbeddingModel(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/10 bg-[#12100e] px-4 text-white outline-none transition focus:border-orange-500"
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

      <div className="mt-8">

        <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          ChromaDB Storage Path
        </label>

        <input
          value={chromaPath}
          onChange={(e) => setChromaPath(e.target.value)}
          className="h-12 w-full rounded-xl border border-white/10 bg-[#12100e] px-4 text-white outline-none transition focus:border-orange-500"
        />

      </div>

    </section>
  );
}