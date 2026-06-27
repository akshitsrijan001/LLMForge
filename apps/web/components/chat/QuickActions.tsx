import {
  FileCode2,
  Database,
  FileText,
  Brain,
} from "lucide-react";

const actions = [
  {
    title: "FastAPI Boilerplate",
    prompt:
      "Generate a production-ready FastAPI boilerplate with JWT authentication.",
    description:
      "Generate secure REST APIs with JWT authentication.",
    icon: FileCode2,
  },
  {
    title: "Data Pipeline",
    prompt:
      "Design a scalable ETL data pipeline using Python and PySpark.",
    description:
      "Build scalable ETL pipelines using PySpark.",
    icon: Database,
  },
  {
    title: "Summarize PDF",
    prompt:
      "Explain how to summarize a PDF using AI and list the implementation steps.",
    description:
      "Extract important insights from uploaded PDFs.",
    icon: FileText,
  },
  {
    title: "Code Assistant",
    prompt:
      "Help me debug and improve my code.",
    description:
      "Debug, optimize and explain code instantly.",
    icon: Brain,
  },
];

type Props = {
  onAction: (prompt: string) => void;
};

export default function QuickActions({ onAction }: Props) {
  return (
    <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto mt-14">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.title}
            onClick={() => onAction(action.prompt)}
            className="
              bg-[#221C1B]
              border
              border-[#3A2A1B]
              rounded-2xl
              p-10
              h-44
              text-left
              transition-all
              duration-300
              hover:scale-105
              hover:border-orange-500
              hover:shadow-xl
              hover:shadow-orange-500/20
            "
          >
            <Icon
              size={40}
              className="text-orange-400 mb-6"
            />

            <h3 className="text-white text-2xl font-semibold mb-3">
              {action.title}
            </h3>

            <p className="text-gray-400 text-base leading-relaxed">
              {action.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}