import {
  Activity,
  BookOpen,
  Boxes,
  Cpu,
  Database,
  FlaskConical,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Workflow,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const modules = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    color: "text-orange-400",
    desc: "Monitor your entire AI workspace from a single overview.",
  },
  {
    title: "Chat",
    icon: MessageSquare,
    color: "text-sky-400",
    desc: "Interact with multiple LLMs, tools and RAG seamlessly.",
  },
  {
    title: "Knowledge Base",
    icon: Database,
    color: "text-green-400",
    desc: "Build searchable document collections powered by embeddings.",
  },
  {
    title: "Models",
    icon: Boxes,
    color: "text-violet-400",
    desc: "Manage Ollama models and compare capabilities.",
  },
  {
    title: "Playground",
    icon: FlaskConical,
    color: "text-pink-400",
    desc: "Experiment with prompts and compare model outputs.",
  },
  {
    title: "Telemetry",
    icon: Activity,
    color: "text-red-400",
    desc: "Track CPU, GPU, RAM, VRAM and inference performance.",
  },
  {
    title: "Pipelines",
    icon: Workflow,
    color: "text-cyan-400",
    desc: "Monitor indexing and background AI workflows.",
  },
  {
    title: "Settings",
    icon: Settings,
    color: "text-yellow-400",
    desc: "Configure providers, embeddings and workspace preferences.",
  },
];

const quickStart = [
  "Download or select an Ollama model",
  "Open Chat and start a conversation",
  "Create a Knowledge Base",
  "Index your project or documents",
  "Use Playground for prompt testing",
  "Monitor performance in Telemetry",
];

export default function GuidePage() {
  return (
    <div className="space-y-8">

      {/* Hero */}

      <section className="rounded-3xl border border-[#35291F] bg-[#221C18] p-10 shadow-xl shadow-black/20">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-orange-500/15 p-4">
            <BookOpen className="h-10 w-10 text-orange-400" />
          </div>

          <div>
            <h1 className="text-5xl font-bold">
              Welcome to{" "}
              <span className="text-orange-400">LLMForge</span>
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-gray-400">
              LLMForge is an all-in-one local AI workspace for building,
              testing, and deploying LLM applications. Chat with models,
              manage knowledge bases, compare prompts, generate images,
              monitor performance, and orchestrate AI workflows from one
              unified interface.
            </p>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-4">

        <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6">
          <p className="text-sm text-gray-400">Modules</p>
          <h2 className="mt-2 text-3xl font-bold text-orange-400">8</h2>
        </div>

        <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6">
          <p className="text-sm text-gray-400">Architecture</p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Local First
          </h2>
        </div>

        <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6">
          <p className="text-sm text-gray-400">RAG</p>
          <h2 className="mt-2 text-2xl font-bold text-green-400">
            Enabled
          </h2>
        </div>

        <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6">
          <p className="text-sm text-gray-400">AI Provider</p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Ollama
          </h2>
        </div>

      </section>

      {/* Modules */}

      <section>

        <h2 className="mb-6 flex items-center gap-2 text-3xl font-bold">
          <Sparkles className="text-orange-400" />
          Workspace Modules
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {modules.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl hover:shadow-black/20"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#171311]">
                  <Icon className={`h-7 w-7 ${item.color}`} />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {item.desc}
                </p>
              </div>
            );
          })}

        </div>

      </section>

      {/* Architecture */}

      <section className="rounded-3xl border border-[#35291F] bg-[#221C18] p-10 shadow-xl shadow-black/20">

        <div className="mb-8 flex items-center gap-3">
          <Cpu className="text-orange-400" />
          <h2 className="text-3xl font-bold">
            LLMForge Architecture
          </h2>
        </div>

        <div className="grid gap-4 text-center md:grid-cols-7">

          {[
            "Next.js",
            "FastAPI",
            "Planner",
            "Tool Router",
            "Ollama",
            "ComfyUI",
            "RAG",
          ].map((step, i) => (
            <div
              key={step}
              className="flex items-center justify-center gap-3"
            >
              <div className="rounded-2xl border border-[#35291F] bg-[#171311] px-5 py-5 font-semibold">
                {step}
              </div>

              {i !== 6 && (
                <ArrowRight className="hidden text-orange-400 md:block" />
              )}
            </div>
          ))}

        </div>

      </section>

      {/* Quick Start */}

      <section className="rounded-3xl border border-[#35291F] bg-[#221C18] p-10 shadow-xl shadow-black/20">

        <h2 className="text-3xl font-bold">
          Quick Start
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          {quickStart.map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-4 rounded-2xl border border-[#35291F] bg-[#171311] p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-black">
                {index + 1}
              </div>

              <p className="text-gray-300">
                {step}
              </p>

            </div>
          ))}

        </div>

      </section>

      <div className="pb-6 text-center text-sm text-gray-500">
        LLMForge v1.0 • Local AI Workspace powered by Next.js, FastAPI & Ollama
      </div>

    </div>
  );
}