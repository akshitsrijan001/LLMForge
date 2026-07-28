"use client";

import { useSettings } from "../../../hooks/useSettings";

export default function TopBar() {
  const {
    temperature,
    topP,
    context,
    ollamaUrl,
    embeddingModel,
    chromaPath,
  } = useSettings();

  const saveSettings = () => {
    localStorage.setItem(
      "llmforge-settings",
      JSON.stringify({
        temperature,
        topP,
        context,
        ollamaUrl,
        embeddingModel,
        chromaPath,
      })
    );

    alert("Settings saved successfully!");
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/[0.06] bg-[#0f0d0b]/90 px-8 backdrop-blur-xl">

      <div className="flex items-center gap-10">

        <button className="border-b-2 border-orange-500 pb-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
          Environment
        </button>

        <button className="text-sm font-medium text-white/45 transition hover:text-white">
          Models
        </button>

        <button className="text-sm font-medium text-white/45 transition hover:text-white">
          Data Layers
        </button>

      </div>

      <button
        onClick={saveSettings}
        className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black transition hover:bg-orange-400"
      >
        Save Settings
      </button>

    </header>
  );
}