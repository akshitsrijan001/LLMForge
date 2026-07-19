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

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  function handleReset() {
    resetSettings();

    const settings = loadSettings();

    setOllamaUrl(settings.ollamaUrl);
    setEmbeddingModel(settings.embeddingModel);
    setChromaPath(settings.chromaPath);
  }

  return (
    <main className="min-h-screen bg-[#0B1020] p-10 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold text-orange-400">
          ⚙️ Settings
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-gray-400">
          Configure your local AI environment and default application
          preferences.
        </p>

        <div className="mt-10 space-y-6 rounded-2xl border border-slate-700 bg-[#142338] p-8">

          <div>
            <label className="mb-2 block font-medium">
              Ollama URL
            </label>

            <input
              value={ollamaUrl}
              onChange={(e) => setOllamaUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#0B1628] p-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Embedding Model
            </label>

            <input
              value={embeddingModel}
              onChange={(e) => setEmbeddingModel(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#0B1628] p-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Vector Database Path
            </label>

            <input
              value={chromaPath}
              onChange={(e) => setChromaPath(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#0B1628] p-3 outline-none"
            />
          </div>

          <div className="flex gap-4">

            <button
              onClick={handleSave}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-400"
            >
              Save Settings
            </button>

            <button
              onClick={handleReset}
              className="rounded-xl bg-slate-700 px-6 py-3 hover:bg-slate-600"
            >
              Reset
            </button>

          </div>

          {saved && (
            <div className="rounded-xl border border-green-600 bg-green-900/20 p-4 text-green-400">
              ✅ Settings saved successfully.
            </div>
          )}

        </div>

      </div>
    </main>
  );
}