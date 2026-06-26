import {
  FileCode2,
  Database,
  FileText,
  Brain,
} from "lucide-react";

const actions = [
  {
    title: "FastAPI Boilerplate",
    description: "Generate secure REST APIs with JWT authentication.",
    icon: FileCode2,
  },
  {
    title: "Data Pipeline",
    description: "Build scalable ETL pipelines using PySpark.",
    icon: Database,
  },
  {
    title: "Summarize PDF",
    description: "Extract important insights from uploaded documents.",
    icon: FileText,
  },
  {
    title: "Code Assistant",
    description: "Generate, debug and optimize your code instantly.",
    icon: Brain,
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto mt-14">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.title}
            className="
              bg-[#221C1B]
              border
              border-[#3A2A1B]
              rounded-2xl
              p-8
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
              size={32}
              className="text-orange-400 mb-6"
            />

            <h3 className="text-white text-xl font-semibold mb-3">
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