"use client";

import { motion } from "framer-motion";
import {
  Database,
  Boxes,
  Cpu,
  FileText,
  ArrowUpRight,
} from "lucide-react";

import { PulseDot } from "../common/Primitives";

const kb = [
  {
    name: "product-docs-v2",
    source: "Notion",
    chunks: 3412,
    freshness: 92,
  },
  {
    name: "engineering-handbook",
    source: "GitHub",
    chunks: 1284,
    freshness: 81,
  },
  {
    name: "support-tickets",
    source: "Zendesk",
    chunks: 8402,
    freshness: 63,
  },
];

const models = [
  {
    name: "Llama 3.1 70B",
    status: "Loaded",
    color: "#a76cf2",
  },
  {
    name: "Claude 3.5 Sonnet",
    status: "Gateway",
    color: "#ff7a1a",
  },
  {
    name: "DeepSeek V3",
    status: "Loaded",
    color: "#3e8ef7",
  },
];

export function Summaries() {
  return (
    <div className="space-y-6">

      <Card
        icon={<Database size={14}/>}
        title="Knowledge Base"
      >

        {kb.map((item,i)=>(
          <motion.div
            key={item.name}
            initial={{opacity:0,y:8}}
            animate={{opacity:1,y:0}}
            transition={{delay:i*.05}}
            className="mb-3 rounded-xl border border-white/5 bg-black/20 p-3"
          >

            <div className="flex items-center justify-between">

              <div>

                <div className="text-sm text-white">
                  {item.name}
                </div>

                <div className="font-mono text-[10px] text-white/40">
                  {item.source} • {item.chunks.toLocaleString()} chunks
                </div>

              </div>

              <ArrowUpRight
                size={15}
                className="text-white/40"
              />

            </div>

            <div className="mt-3 h-1 rounded-full bg-white/5">

              <motion.div
                initial={{width:0}}
                animate={{width:`${item.freshness}%`}}
                transition={{duration:.8}}
                className="h-full rounded-full bg-[#34d399]"
              />

            </div>

          </motion.div>
        ))}

      </Card>

      <Card
        icon={<Boxes size={14}/>}
        title="Installed Models"
      >

        {models.map((m,i)=>(
          <motion.div
            key={m.name}
            initial={{opacity:0,y:8}}
            animate={{opacity:1,y:0}}
            transition={{delay:i*.05}}
            className="mb-3 flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-3"
          >

            <div className="flex items-center gap-3">

              <Cpu
                size={15}
                color={m.color}
              />

              <span className="text-sm text-white">
                {m.name}
              </span>

            </div>

            <span className="inline-flex items-center gap-2 text-[11px] text-white/60">

              <PulseDot
                color={m.color}
                size={6}
              />

              {m.status}

            </span>

          </motion.div>
        ))}

      </Card>

    </div>
  );
}

function Card({
  title,
  icon,
  children,
}:{
  title:string;
  icon:React.ReactNode;
  children:React.ReactNode;
}){

  return(

    <section className="rounded-[24px] border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl">

      <header className="mb-5 flex items-center gap-2">

        {icon}

        <span className="font-mono text-[11px] uppercase tracking-widest text-white/50">
          {title}
        </span>

      </header>

      {children}

    </section>

  )

}

export default Summaries;