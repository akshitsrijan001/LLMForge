export interface UploadedFile {
  name: string;
  path?: string;
  text?: string;
}

export interface GenerationSettings {
  temperature: number;
  topP: number;
  context: number;
}

export type Message = {
  role: "user" | "assistant";
  content: string;
  files?: UploadedFile[];
  timestamp?: number;
};

export interface ChatRequest {
  prompt: string;
  model: string;
  history: Message[];
  files?: UploadedFile[];
  generation_settings: GenerationSettings;
}