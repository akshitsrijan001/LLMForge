"use client";

import { useEffect, useState } from "react";
import {
  loadSettings,
  saveSettings,
  resetSettings,
} from "../../services/settings.service";

export default function SettingsPage() {
  const [ollamaUrl, setOllamaUrl] = useState("");
  const [embeddingModel, setEmbeddingModel] = useState("");
  const [chromaPath, setChromaPath] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const settings = loadSettings();

    setOllamaUrl(settings.ollamaUrl);
    setEmbeddingModel(settings.embeddingModel);
    setChromaPath(settings.chromaPath);
  }, []);

  function handleSave() {
    saveSettings({
      ollamaUrl,
      embeddingModel,
      chromaPath,
    });

    setSaved(true);

    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    resetSettings();

    const settings = loadSettings();

    setOllamaUrl(settings.ollamaUrl);
    setEmbeddingModel(settings.embeddingModel);
    setChromaPath(settings.chromaPath);
  }

  return (
    <div className="space-y-8">

      {/* Stats */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6 shadow-xl shadow-black/20">
          <p className="text-sm text-gray-400">LLM Provider</p>
          <h2 className="mt-2 text-2xl font-bold text-orange-400">
            Ollama
          </h2>
        </div>

        <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6 shadow-xl shadow-black/20">
          <p className="text-sm text-gray-400">Embedding Model</p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            {embeddingModel || "--"}
          </h2>
        </div>

        <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6 shadow-xl shadow-black/20">
          <p className="text-sm text-gray-400">Status</p>
          <h2 className="mt-2 text-xl font-semibold text-green-400">
            Ready
          </h2>
        </div>

      </div>

      {/* Settings */}

      <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-8 shadow-xl shadow-black/20">

        <div className="space-y-6">

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-300">
              Ollama URL
            </label>

            <input
              value={ollamaUrl}
              onChange={(e) => setOllamaUrl(e.target.value)}
              className="w-full rounded-2xl border border-[#35291F] bg-[#171311] p-4 text-white outline-none transition focus:border-orange-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-300">
              Embedding Model
            </label>

            <input
              value={embeddingModel}
              onChange={(e) => setEmbeddingModel(e.target.value)}
              className="w-full rounded-2xl border border-[#35291F] bg-[#171311] p-4 text-white outline-none transition focus:border-orange-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-300">
              Vector Database Path
            </label>

            <input
              value={chromaPath}
              onChange={(e) => setChromaPath(e.target.value)}
              className="w-full rounded-2xl border border-[#35291F] bg-[#171311] p-4 text-white outline-none transition focus:border-orange-500"
            />

          </div>

          <div className="flex gap-4 pt-2">

            <button
              onClick={handleSave}
              className="rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-black transition hover:bg-orange-400"
            >
              Save Settings
            </button>

            <button
              onClick={handleReset}
              className="rounded-2xl border border-[#35291F] bg-[#2A211B] px-6 py-3 text-white transition hover:border-orange-500 hover:bg-[#35291F]"
            >
              Reset
            </button>

          </div>

          {saved && (
            <div className="rounded-2xl border border-green-700 bg-green-900/20 p-4 text-green-400">
               Settings saved successfully.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}