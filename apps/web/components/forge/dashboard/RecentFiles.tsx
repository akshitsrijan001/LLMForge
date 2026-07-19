"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const files = [
  {
    name: "product-docs-v2",
    size: "3.4 GB",
  },
  {
    name: "engineering-handbook",
    size: "1.2 GB",
  },
  {
    name: "support-tickets",
    size: "8.1 GB",
  },
];

export default function RecentFiles() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-[24px] border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl"
    >

      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        Recent Knowledge Bases
      </div>

      <div className="mt-6 space-y-4">

        {files.map((file)=>(
          <div
            key={file.name}
            className="rounded-xl border border-white/5 bg-black/20 p-4"
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <FileText
                  size={16}
                  className="text-emerald-400"
                />

                <div>

                  <div className="text-sm text-white">
                    {file.name}
                  </div>

                  <div className="font-mono text-[10px] text-white/40">
                    {file.size}
                  </div>

                </div>

              </div>

              <span className="text-xs text-emerald-400">
                Indexed
              </span>

            </div>

          </div>
        ))}

      </div>

    </motion.section>
  );
}