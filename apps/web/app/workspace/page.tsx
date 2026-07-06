"use client";

import Link from "next/link";
import {
  Brain,
  Database,
  FlaskConical,
  Settings,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    title: "Models",
    description:
      "Chat with your local LLMs and manage conversations.",
    href: "/workspace/models",
    icon: Brain,
    color: "text-orange-400",
  },
  {
    title: "Knowledge Bases",
    description:
      "Create, manage and index Retrieval-Augmented Generation knowledge bases.",
    href: "/workspace/knowledge-base",
    icon: Database,
    color: "text-blue-400",
  },
  {
    title: "Playground",
    description:
      "Experiment with prompts, models and generation settings.",
    href: "/workspace/playground",
    icon: FlaskConical,
    color: "text-green-400",
  },
  {
    title: "Settings",
    description:
      "Configure Ollama, embeddings and application preferences.",
    href: "/workspace/settings",
    icon: Settings,
    color: "text-purple-400",
  },
];

export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white p-10">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-bold text-orange-400">
          🚀 LLMForge Workspace
        </h1>

        <p className="mt-4 text-lg text-gray-400 max-w-3xl">
          Your local AI development environment. Build knowledge bases,
          experiment with models, tune settings and prototype AI workflows.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-700
                  bg-[#142338]
                  p-8
                  transition-all
                  duration-300
                  hover:border-orange-500
                  hover:shadow-xl
                  hover:shadow-orange-500/10
                "
              >
                <div className="flex items-center justify-between">

                  <Icon
                    size={42}
                    className={card.color}
                  />

                  <ArrowRight
                    size={24}
                    className="
                      text-gray-500
                      transition-transform
                      group-hover:translate-x-2
                      group-hover:text-orange-400
                    "
                  />

                </div>

                <h2 className="mt-8 text-2xl font-bold">
                  {card.title}
                </h2>

                <p className="mt-4 text-gray-400 leading-7">
                  {card.description}
                </p>

              </Link>
            );
          })}

        </div>
      </div>
    </main>
  );
}