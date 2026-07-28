"use client";

const sections = [
  {
    title: "💬 Chat",
    description:
      "Talk with local or cloud LLMs, upload files, browse the web, and generate images from one workspace.",
  },
  {
    title: "📚 Knowledge Base",
    description:
      "Create knowledge bases, index projects, and chat with your code using Retrieval-Augmented Generation (RAG).",
  },
  {
    title: "🧪 Playground",
    description:
      "Experiment with prompts, compare model responses, and test inference settings without affecting conversations.",
  },
  {
    title: "🤖 Models",
    description:
      "Manage installed Ollama models, inspect parameters, and switch between local models instantly.",
  },
  {
    title: "🖼️ Image Generation",
    description:
      "Generate AI images through ComfyUI workflows directly inside LLMForge.",
  },
  {
    title: "⚙️ Settings",
    description:
      "Configure Ollama, embedding models, vector database paths, and other workspace preferences.",
  },
];

export default function GuidePage() {
  return (
    <div className="space-y-8">

      <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-10 shadow-xl shadow-black/20">

        <h1 className="text-4xl font-bold text-orange-400">
          Welcome to LLMForge
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-gray-400">
          Your complete local AI workspace for chatting with LLMs, building RAG
          knowledge bases, testing prompts, managing models, and generating
          images from one place.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-orange-500"
          >
            <h2 className="text-xl font-bold text-white">
              {section.title}
            </h2>

            <p className="mt-3 text-gray-400">
              {section.description}
            </p>
          </div>
        ))}

      </div>

      <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-8 shadow-xl shadow-black/20">

        <h2 className="text-2xl font-bold text-white">
          Quick Start
        </h2>

        <ol className="mt-6 list-decimal space-y-4 pl-6 text-gray-300">
          <li>Select or download an Ollama model.</li>
          <li>Open Chat and start a new conversation.</li>
          <li>Create a Knowledge Base and index a project.</li>
          <li>Use Playground to compare prompts.</li>
          <li>Generate images with the Image tool.</li>
          <li>Customize your environment in Settings.</li>
        </ol>

      </div>

    </div>
  );
}