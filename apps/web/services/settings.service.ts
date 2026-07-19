const STORAGE_KEY = "llmforge-settings";

export type AppSettings = {
  ollamaUrl: string;
  embeddingModel: string;
  chromaPath: string;
};

const defaults: AppSettings = {
  ollamaUrl: "http://localhost:11434",
  embeddingModel: "bge-large",
  chromaPath: "./vector_db",
};

export function loadSettings(): AppSettings {
  if (typeof window === "undefined") return defaults;

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return defaults;

  return JSON.parse(saved);
}

export function saveSettings(settings: AppSettings) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  );
}

export function resetSettings() {
  localStorage.removeItem(STORAGE_KEY);
}