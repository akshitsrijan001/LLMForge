"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  knowledgeBase: string;
  onClose: () => void;
  onIndex: (path: string) => void;
};

export default function IndexProjectModal({
  open,
  knowledgeBase,
  onClose,
  onIndex,
}: Props) {
  const [path, setPath] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-[30px] border border-white/[0.08] bg-[#171311] p-8 shadow-2xl shadow-black/50">

        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-orange-300/70">
          Knowledge Indexing
        </p>

        <h2 className="text-3xl font-bold text-white">
          Index Project
        </h2>

        <p className="mt-2 text-white/45">
          Select a local project folder to index into the chosen knowledge
          base.
        </p>

        <div className="mt-8">

          <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Knowledge Base
          </label>

          <div className="rounded-2xl border border-white/10 bg-[#12100e] px-5 py-4 text-white">
            {knowledgeBase}
          </div>

        </div>

        <div className="mt-8">

          <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Project Folder
          </label>

          <input
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="C:\Users\Srijan\Desktop\Project"
            className="h-14 w-full rounded-2xl border border-white/10 bg-[#12100e] px-5 text-white outline-none transition focus:border-orange-500"
          />

          <p className="mt-3 text-sm text-white/35">
            The selected folder will be scanned and indexed into the current
            knowledge base.
          </p>

        </div>

        <div className="mt-10 flex justify-end gap-4">

          <button
            onClick={() => {
              setPath("");
              onClose();
            }}
            className="rounded-xl border border-white/10 bg-[#221C18] px-6 py-3 font-medium text-white transition hover:border-orange-500 hover:bg-[#2B241F]"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onIndex(path);
              setPath("");
            }}
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black transition hover:bg-orange-400"
          >
            Index Project
          </button>

        </div>

      </div>

    </div>
  );
}