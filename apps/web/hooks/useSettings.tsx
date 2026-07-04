"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Settings = {
  temperature: number;
  topP: number;
  context: number;

  ollamaUrl: string;
  embeddingModel: string;
  chromaPath: string;

  setTemperature: (v: number) => void;
  setTopP: (v: number) => void;
  setContext: (v: number) => void;

  setOllamaUrl: (v: string) => void;
  setEmbeddingModel: (v: string) => void;
  setChromaPath: (v: string) => void;
};

const SettingsContext = createContext<Settings | null>(null);

export function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [temperature, setTemperature] = useState(0.4);
  const [topP, setTopP] = useState(0.95);
  const [context, setContext] = useState(4096);

  const [ollamaUrl, setOllamaUrl] = useState("http://localhost:11434");
  const [embeddingModel, setEmbeddingModel] = useState(
    "nomic-embed-text:latest"
  );
  const [chromaPath, setChromaPath] = useState("./vector_db");

  useEffect(() => {
    const saved = localStorage.getItem("llmforge-settings");

    if (!saved) return;

    const data = JSON.parse(saved);

    if (data.temperature !== undefined)
      setTemperature(data.temperature);

    if (data.topP !== undefined)
      setTopP(data.topP);

    if (data.context !== undefined)
      setContext(data.context);

    if (data.ollamaUrl)
      setOllamaUrl(data.ollamaUrl);

    if (data.embeddingModel)
      setEmbeddingModel(data.embeddingModel);

    if (data.chromaPath)
      setChromaPath(data.chromaPath);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        temperature,
        topP,
        context,

        ollamaUrl,
        embeddingModel,
        chromaPath,

        setTemperature,
        setTopP,
        setContext,

        setOllamaUrl,
        setEmbeddingModel,
        setChromaPath,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);

  if (!ctx) {
    throw new Error("SettingsProvider missing");
  }

  return ctx;
}