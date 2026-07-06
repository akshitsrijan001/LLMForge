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
    name:string;
    chunks:number;
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

    const result = await indexProject(
        path,
        selectedKb,
    );

    alert(
        `Indexed ${result.indexed_files} files successfully!`
    );

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
    <main className="min-h-screen bg-[#0B1020] text-white p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-orange-400">
          📚 Knowledge Bases
        </h1>

        <p className="text-gray-400 mt-3 mb-8">
          Create and manage your Retrieval-Augmented Generation knowledge bases.
        </p>

        <div className="flex gap-4 mb-10">
          <input
            value={newKb}
            onChange={(e) => setNewKb(e.target.value)}
            placeholder="Knowledge base name..."
            className="flex-1 bg-[#162338] rounded-lg px-4 py-3 border border-slate-700"
          />

          <button
            onClick={create}
            className="bg-orange-500 hover:bg-orange-600 px-6 rounded-lg font-semibold"
          >
            Create
          </button>
        </div>

        <div className="space-y-4">
          {bases.map((kb) => (
            <KnowledgeBaseCard
              key={kb.name}
              name={kb.name}
              chunks={kb.chunks}
              onDelete={() => remove(kb.name)}
              onIndex={()=>{
    setSelectedKb(kb.name);
    setIndexOpen(true);
}}
            />
          ))}
        </div>

      </div>
      <IndexProjectModal
    open={indexOpen}
    knowledgeBase={selectedKb}
    onClose={() => setIndexOpen(false)}
    onIndex={index}
/>
    </main>
  );
}