"use client";

import { motion } from "framer-motion";
import {
  GitCommit,
  Play,
  Database,
  MessageSquare,
  Boxes,
} from "lucide-react";

const events = [
  {
    icon: GitCommit,
    title: "Committed feat/rerank-v3",
    subtitle: "3 files • 128 additions",
    color: "#ff7a1a",
    time: "2m",
  },
  {
    icon: Play,
    title: "Started Evaluation Run",
    subtitle: "43 prompts • llama-3.1",
    color: "#34d399",
    time: "6m",
  },
  {
    icon: MessageSquare,
    title: "Claude replied",
    subtitle: "Refactor scoring loop",
    color: "#a76cf2",
    time: "12m",
  },
  {
    icon: Database,
    title: "Indexed Knowledge Base",
    subtitle: "3412 chunks",
    color: "#3e8ef7",
    time: "29m",
  },
  {
    icon: Boxes,
    title: "Pulled DeepSeek V3",
    subtitle: "26GB Local",
    color: "#f5b544",
    time: "1h",
  },
];

export function WorkspaceActivity(){

return(

<section className="rounded-[24px] border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl">

<header className="mb-6">

<div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
Workspace Activity
</div>

<h3 className="mt-1 text-lg font-semibold text-white">
Recent Events
</h3>

</header>

<div className="space-y-4">

{events.map((e,i)=>{

const Icon=e.icon;

return(

<motion.div

key={i}

initial={{opacity:0,x:-10}}

animate={{opacity:1,x:0}}

transition={{delay:i*.05}}

className="flex items-start gap-4 rounded-xl border border-white/5 bg-black/20 p-4"

>

<div
className="flex h-10 w-10 items-center justify-center rounded-full"
style={{
background:`${e.color}20`,
color:e.color
}}
>

<Icon size={16}/>

</div>

<div className="flex-1">

<div className="text-sm text-white">
{e.title}
</div>

<div className="font-mono text-[10px] text-white/40">
{e.subtitle}
</div>

</div>

<div className="font-mono text-[10px] text-white/40">
{e.time}
</div>

</motion.div>

);

})}

</div>

</section>

);

}

export default WorkspaceActivity;