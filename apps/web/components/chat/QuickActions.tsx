import {
  FileCode2,
  Database,
  FileText,
  Brain,
} from "lucide-react";

const actions = [
  {
    title: "FastAPI Boilerplate",
    icon: FileCode2,
  },
  {
    title: "Data Pipeline",
    icon: Database,
  },
  {
    title: "Summarize PDF",
    icon: FileText,
  },
  {
    title: "Code Assistant",
    icon: Brain,
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">

      {actions.map((action) => {

        const Icon = action.icon;

        return (

          <button
            key={action.title}
            className="bg-[#221c18] hover:bg-[#2A211B] transition rounded-2xl p-8 text-left border border-[#2A211B]"
          >

            <Icon
              className="text-orange-400 mb-6"
              size={28}
            />

            <h3 className="text-white font-semibold">
              {action.title}
            </h3>

          </button>

        );
      })}
    </div>
  );
}