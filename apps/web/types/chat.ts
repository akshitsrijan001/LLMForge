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

export interface WebSource {
  title: string;
  link: string;
}

export type Message = {
  role: "user" | "assistant";
  content: string;

  files?: UploadedFile[];
  timestamp?: number;

  images?: string[];
  sources?: WebSource[];
};

export interface ChatRequest {
  prompt: string;
  model: string;
  history: Message[];
  files?: UploadedFile[];
  generation_settings: GenerationSettings;
  knowledge_base: string;

  web_context?: string;
}