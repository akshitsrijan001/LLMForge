"use client";

import { useEffect, useState } from "react";

import {
  getKnowledgeBases,
  createKnowledgeBase,
  deleteKnowledgeBase,
} from "../../../services/knowledgeBase.service";

import KnowledgeBaseCard from "./KnowledgeBaseCard";
import IndexProjectModal from "./IndexProjectModal";
import { indexProject } from "../../../services/project.service";

export default function KnowledgeBasePage() {
  const [bases, setBases] = useState<
    {
      name: string;
      chunks: number;
    }[]
  >([]);

  const [newKb, setNewKb] = useState("");
  const [indexOpen, setIndexOpen] = useState(false);
  const [selectedKb, setSelectedKb] = useState("");

  async function load() {
    const data = await getKnowledgeBases();
    setBases(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function index(path: string) {
    if (!path.trim()) return;

    const result = await indexProject(path, selectedKb);

    alert(`Indexed ${result.indexed_files} files successfully!`);

    setIndexOpen(false);
  }

  async function create() {
    if (!newKb.trim()) return;

    await createKnowledgeBase(newKb);
    setNewKb("");
    load();
  }

  async function remove(name: string) {
    if (name === "default") {
      alert("Default knowledge base cannot be deleted.");
      return;
    }

    await deleteKnowledgeBase(name);
    load();
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <section className="rounded-[30px] border border-white/[0.06] bg-white/[0.025] p-8 shadow-2xl shadow-black/20">

        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-orange-300/70">
          Knowledge
        </p>

        <h1 className="text-3xl font-bold text-white">
          Knowledge Bases
        </h1>

        <p className="mt-2 max-w-2xl text-white/45">
          Organize documents into searchable knowledge collections and
          index local projects for Retrieval-Augmented Generation.
        </p>

      </section>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-7 shadow-2xl shadow-black/20">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Knowledge Bases
          </p>

          <h2 className="mt-3 text-4xl font-bold text-orange-400">
            {bases.length}
          </h2>

        </div>

        <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-7 shadow-2xl shadow-black/20">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Indexed Chunks
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {bases.reduce((a, b) => a + b.chunks, 0)}
          </h2>

        </div>

        <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-7 shadow-2xl shadow-black/20">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            System Status
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-400">
            Ready
          </h2>

        </div>

      </div>

      {/* Toolbar */}

      <section className="rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-7 shadow-2xl shadow-black/20">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

          <input
            placeholder="Search knowledge bases..."
            className="h-12 rounded-xl border border-white/10 bg-[#12100e] px-4 text-white outline-none transition focus:border-orange-500 lg:w-80"
          />

          <div className="flex-1" />

          <input
            value={newKb}
            onChange={(e) => setNewKb(e.target.value)}
            placeholder="Knowledge base name..."
            className="h-12 flex-1 rounded-xl border border-white/10 bg-[#12100e] px-4 text-white outline-none transition focus:border-orange-500"
          />

          <button
            onClick={create}
            className="h-12 rounded-xl bg-orange-500 px-6 font-semibold text-black transition hover:bg-orange-400"
          >
            Create
          </button>

        </div>

      </section>

      {/* Knowledge Bases */}

      <div className="space-y-6">

        {bases.length === 0 && (

          <div className="rounded-[30px] border border-dashed border-white/10 bg-white/[0.025] p-20 text-center shadow-2xl shadow-black/20">

            <div className="mb-6 text-6xl">
              📚
            </div>

            <h2 className="text-3xl font-bold text-white">
              No Knowledge Bases Found
            </h2>

            <p className="mt-3 text-white/45">
              Create your first knowledge base and begin indexing your
              repositories, notes, and documentation.
            </p>

          </div>

        )}

        {bases.map((kb) => (
          <KnowledgeBaseCard
            key={kb.name}
            name={kb.name}
            chunks={kb.chunks}
            onDelete={() => remove(kb.name)}
            onIndex={() => {
              setSelectedKb(kb.name);
              setIndexOpen(true);
            }}
          />
        ))}

      </div>

      <IndexProjectModal
        open={indexOpen}
        knowledgeBase={selectedKb}
        onClose={() => setIndexOpen(false)}
        onIndex={index}
      />

    </div>
  );
}