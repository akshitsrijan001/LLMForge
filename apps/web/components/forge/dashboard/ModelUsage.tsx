"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { TelemetryGraph } from "./TelemetryGraph";

export default function ModelUsage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">

        <div>

          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Active Model
          </div>

          <h3 className="mt-1 text-lg font-semibold text-white">
            Llama 3.1 70B
          </h3>

        </div>

        <Cpu
          size={18}
          className="text-orange-400"
        />

      </div>

      <div className="mt-8">

        <TelemetryGraph
          color="#ff7a1a"
          height={140}
          width={420}
          fill
          isLive
          data={[
            32,34,35,37,36,39,41,43,
            42,45,47,49,48,51,53,55,
            57,60,64,
          ]}
        />

      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <Stat
          label="Requests"
          value="12,481"
        />

        <Stat
          label="Latency"
          value="128 ms"
        />

        <Stat
          label="Tokens/sec"
          value="142"
        />

        <Stat
          label="GPU"
          value="68%"
        />

      </div>
    </motion.section>
  );
}

function Stat({
  label,
  value,
}:{
  label:string;
  value:string;
}){

  return(
    <div className="rounded-xl border border-white/5 bg-black/20 p-3">

      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </div>

      <div className="mt-1 text-lg font-semibold text-white">
        {value}
      </div>

    </div>
  );

}