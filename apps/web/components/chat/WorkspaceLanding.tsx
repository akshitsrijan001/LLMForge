"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  FileCode2,
  FileText,
  Search,
  Sparkles,
  Database,
  Cpu,
} from "lucide-react";

type Props = {
  onAction: (prompt: string) => void;
  model: string;
};

const actions = [
  {
    icon: Code2,
    title: "Build FastAPI API",
    prompt: "Generate a production-ready FastAPI project with JWT authentication.",
  },
  {
    icon: Brain,
    title: "Explain Repository",
    prompt: "Explain the architecture of this project.",
  },
  {
    icon: FileText,
    title: "Summarize Documents",
    prompt: "Summarize the uploaded documents.",
  },
  {
    icon: Search,
    title: "Search Knowledge Base",
    prompt: "Explain this project from the indexed knowledge base.",
  },
  {
    icon: Database,
    title: "Optimize Database",
    prompt: "Optimize my database schema.",
  },
  {
    icon: FileCode2,
    title: "Debug Code",
    prompt: "Help me debug my code.",
  },
];

export default function WorkspaceLanding({
  onAction,
  model,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5 }}
      className="mx-auto w-full max-w-6xl"
    >
      <div className="py-14 text-center">

        <div className="mb-6 flex justify-center">

          <div className="rounded-full bg-orange-500/20 p-5 border border-orange-500/30">
            <Sparkles
              size={42}
              className="text-orange-400"
            />
          </div>

        </div>

        <h1 className="text-6xl font-black tracking-tight">

          LLM<span className="text-orange-500">Forge</span>

        </h1>

        <p className="mt-5 text-xl text-gray-400 max-w-3xl mx-auto leading-9">

          Your local AI development workspace with multiple LLMs,
          Retrieval-Augmented Generation, DSPy prompt optimization
          and intelligent model routing.

        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Badge icon={<Cpu size={16}/>}>
            Ollama Connected
          </Badge>

          <Badge icon={<Database size={16}/>}>
            Knowledge Base : default
          </Badge>

          <Badge icon={<Brain size={16}/>}>
            Model : {model}
          </Badge>

        </div>

      </div>

      <h2 className="mb-6 text-xl font-semibold text-gray-200">
        Suggested Tasks
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {actions.map((action, index) => {

          const Icon = action.icon;

          return (

            <motion.button

              key={action.title}

              whileHover={{
                scale:1.03,
                y:-5,
              }}

              whileTap={{
                scale:.98,
              }}

              transition={{
                duration:.15,
              }}

              onClick={() => onAction(action.prompt)}

              className="
                rounded-2xl
                border
                border-[#2A211B]
                bg-[#1B1715]
                p-7
                text-left
                hover:border-orange-500
                transition-all
              "
            >

              <div className="mb-5 inline-flex rounded-xl bg-orange-500/15 p-3">

                <Icon
                  size={28}
                  className="text-orange-400"
                />

              </div>

              <h3 className="mb-2 text-xl font-semibold">

                {action.title}

              </h3>

              <p className="text-gray-400">

                Click to instantly start with this prompt.

              </p>

            </motion.button>

          );

        })}

      </div>

      <div className="mt-12 rounded-2xl border border-[#2A211B] bg-[#171311] p-8">

        <h3 className="mb-5 text-lg font-semibold">

          Recent Ideas

        </h3>

        <div className="flex flex-wrap gap-3">

          {[
            "Explain React hooks",
            "Summarize README",
            "Optimize FastAPI",
            "Generate unit tests",
            "Improve architecture",
          ].map((item) => (

            <button

              key={item}

              onClick={() => onAction(item)}

              className="
                rounded-full
                border
                border-[#2A211B]
                px-5
                py-2
                text-sm
                hover:border-orange-500
                hover:text-orange-300
              "
            >

              {item}

            </button>

          ))}

        </div>

      </div>

    </motion.div>
  );
}

function Badge({
  children,
  icon,
}:{
  children:React.ReactNode;
  icon:React.ReactNode;
}){

  return(

    <div className="
      flex
      items-center
      gap-2
      rounded-full
      border
      border-[#2A211B]
      bg-[#1B1715]
      px-5
      py-3
      text-sm
    ">

      {icon}

      {children}

    </div>

  )

}