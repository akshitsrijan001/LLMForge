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
    <header className="h-24 border-b border-[#243248] flex items-center justify-between px-12">

      <div className="flex items-center gap-14 text-lg font-semibold">

        <button className="text-orange-400 border-b-2 border-orange-400 pb-2">
          Environment
        </button>

        <button className="text-gray-400 hover:text-white transition">
          Models
        </button>

        <button className="text-gray-400 hover:text-white transition">
          Data Layers
        </button>

      </div>
      <button
    onClick={saveSettings}
    className="bg-blue-500 hover:bg-blue-600 transition px-8 py-3 rounded-xl font-bold text-white"
  >
    Save Settings
  </button>

    </header>
  );
}