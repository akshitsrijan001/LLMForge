import {
  BookOpen,
  LayoutDashboard,
  MessageSquare,
  Database,
 Boxes,
  FlaskConical,
  Activity,
  Workflow,
  Settings,
  Cpu,
} from "lucide-react";

const sections = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    desc: "The Dashboard serves as the command center of LLMForge, providing a live overview of your workspace, active models, knowledge bases, telemetry, and recent activity. It helps developers monitor the overall health and productivity of their AI environment at a glance.",
    features: [
      "Workspace overview",
      "Quick actions",
      "Recent activity",
      "Telemetry summary",
    ],
  },
  {
    icon: MessageSquare,
    title: "Chat",
    desc: "The Chat module enables seamless conversations with local language models. It supports streaming responses, intelligent model routing, Retrieval-Augmented Generation (RAG), and document-aware conversations for productive AI interactions.",
    features: [
      "Streaming responses",
      "Automatic model routing",
      "Knowledge Base support",
      "Conversation export",
    ],
  },
  {
    icon: Database,
    title: "Knowledge Base",
    desc: "Upload, organize, and manage documents that power Retrieval-Augmented Generation. Knowledge Bases allow your models to answer questions using your own documents instead of relying only on model memory.",
    features: [
      "PDF & Markdown upload",
      "Document indexing",
      "Chunk management",
      "Multiple knowledge bases",
    ],
  },
  {
    icon: Boxes,
    title: "Models",
    desc: "Manage every installed language model from one place. View available models, compare capabilities, and switch between them instantly while monitoring their resource usage.",
    features: [
      "Installed models",
      "Context information",
      "Memory usage",
      "Model switching",
    ],
  },
  {
    icon: FlaskConical,
    title: "Playground",
    desc: "Experiment with prompts, compare responses from different models, and fine-tune generation parameters before integrating prompts into production workflows.",
    features: [
      "Prompt testing",
      "Model comparison",
      "Temperature tuning",
      "Response evaluation",
    ],
  },
  {
    icon: Activity,
    title: "Telemetry",
    desc: "Telemetry continuously monitors your local AI environment by displaying CPU, RAM, GPU, VRAM, latency, and overall system health in real time.",
    features: [
      "CPU usage",
      "GPU usage",
      "RAM monitoring",
      "Latency tracking",
    ],
  },
  {
    icon: Workflow,
    title: "Pipelines",
    desc: "Pipelines track long-running AI workflows such as document indexing, embedding generation, evaluations, and other background AI tasks.",
    features: [
      "Pipeline status",
      "Progress tracking",
      "Background jobs",
      "Execution history",
    ],
  },
  {
    icon: Settings,
    title: "Settings",
    desc: "Customize your LLMForge workspace by configuring default models, API endpoints, appearance, and other application preferences.",
    features: [
      "API configuration",
      "Default model",
      "Workspace preferences",
      "Application settings",
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[#0b0a09] text-white">
      <div className="mx-auto max-w-7xl px-8 py-14">

        <div className="mb-14 rounded-3xl border border-orange-500/20 bg-gradient-to-br from-[#1a120d] to-[#0f0d0b] p-10">
          <div className="flex items-center gap-4">
            <BookOpen className="h-12 w-12 text-orange-400" />
            <div>
              <h1 className="text-5xl font-bold">
                LLM<span className="text-orange-400">Forge</span>
              </h1>
              <p className="mt-3 max-w-4xl text-white/70 leading-8">
                LLMForge is a privacy-first AI development workspace built for
                experimenting with multiple Large Language Models, Retrieval
                Augmented Generation (RAG), prompt engineering, intelligent
                routing, and local AI workflows. Everything is designed to help
                developers build, evaluate, and monitor AI applications from one
                unified interface.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <div
                key={section.title}
                className="rounded-2xl border border-white/10 bg-[#161311] p-7 hover:border-orange-500/30 transition"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-orange-500/15 p-3">
                    <Icon className="text-orange-400" size={24} />
                  </div>

                  <h2 className="text-2xl font-semibold">
                    {section.title}
                  </h2>
                </div>

                <p className="text-white/70 leading-7">
                  {section.desc}
                </p>

                <ul className="mt-6 space-y-2">
                  {section.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm text-white/70"
                    >
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl border border-white/10 bg-[#161311] p-10">
          <div className="flex items-center gap-3">
            <Cpu className="text-orange-400" />
            <h2 className="text-3xl font-semibold">
              Architecture
            </h2>
          </div>

          <div className="mt-8 rounded-xl bg-black/30 p-8 font-mono text-center text-orange-300 leading-9">
            Next.js Frontend
            <br />
            ↓
            <br />
            FastAPI Backend
            <br />
            ↓
            <br />
            Intelligent Router
            <br />
            ↓
            <br />
            Ollama Runtime
            <br />
            ↓
            <br />
            Local Language Models
            <br />
            ↓
            <br />
            Knowledge Bases
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-white/40">
          LLMForge v1.0 • Built with Next.js, FastAPI & Ollama
        </div>
      </div>
    </div>
  );
}