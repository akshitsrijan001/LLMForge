"use client";

import { useEffect, useState } from "react";
import { Database, Layers3, ShieldCheck } from "lucide-react";

import ChatInput from "../chat/ChatInput";
import ChatWindow from "../chat/ChatWindow";
import WorkspaceLanding from "../chat/WorkspaceLanding";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { useForgeChat } from "../../hooks/useForgeChat";
import { useKnowledgeBase } from "../../hooks/useKnowledgeBase";
import { useSessions } from "../../hooks/useSessions";
import { getKnowledgeBases } from "../../services/knowledgeBase.service";
import { getInstalledModels } from "../../services/system.service";

type KnowledgeBase = {
  name: string;
  chunks: number;
};

type InstalledModel = {
  name: string;
};

export default function ChatWorkspace() {
  const {
    sessions,
    current,
    currentId,
    setCurrentId,
    newSession,
    deleteSession,
    renameSession,
    togglePin,
    saveMessages,
  } = useSessions();
  const { knowledgeBase, setKnowledgeBase } = useKnowledgeBase();
  const [model, setModel] = useState("auto");
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [messages, setMessages] = useState(
  current?.messages ?? []
);

  useEffect(() => {
    async function loadWorkspaceData() {
      const [basesResult, modelsResult] = await Promise.allSettled([
        getKnowledgeBases(),
        getInstalledModels(),
      ]);

      if (basesResult.status === "fulfilled") {
        const bases = basesResult.value as KnowledgeBase[];
        setKnowledgeBases(bases);
        const firstBase = bases[0];

        if (firstBase && !bases.some((base) => base.name === knowledgeBase)) {
          setKnowledgeBase(firstBase.name);
        }
      }

      if (modelsResult.status === "fulfilled") {
        setModels(
          (modelsResult.value as InstalledModel[]).map((installed) => installed.name)
        );
      }
    }

    void loadWorkspaceData();
  }, [knowledgeBase, setKnowledgeBase]);

  const {
  ask,
  stop,
  loading,
} = useForgeChat();

const [loaded, setLoaded] = useState(false);

useEffect(() => {
    if (current) {
        setMessages(current.messages);
        setLoaded(true);
    }
}, [current]);

useEffect(() => {
    if (!loaded) return;
    if (!currentId) return;

    saveMessages(currentId, messages);
}, [messages, loaded, currentId]);

  function exportConversation() {
    if (!current || messages.length === 0) return;

    const content = messages
      .map(
        (message) =>
          `## ${message.role === "user" ? "You" : "LLMForge"}\n\n${message.content}`
      )
      .join("\n\n---\n\n");
    const file = new Blob([`# ${current.title}\n\n${content}\n`], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${current.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "llmforge-chat"}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0a09] text-white">
      <div className="hidden xl:block">
        <Sidebar
          sessions={sessions}
          currentId={currentId}
          setCurrentId={setCurrentId}
          newSession={newSession}
          deleteSession={deleteSession}
          renameSession={renameSession}
          togglePin={togglePin}
        />
      </div>

      <main className="flex min-w-0 flex-1 flex-col bg-[radial-gradient(circle_at_65%_0%,rgba(249,115,22,0.10),transparent_26%),#0b0a09]">
        <Header
          model={model}
          onModelChange={setModel}
          models={models}
          sessionTitle={current?.title ?? "New conversation"}
          onExport={exportConversation}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] bg-black/20 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-2 text-xs text-white/45">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/10 text-emerald-300">
              <ShieldCheck size={14} />
            </span>
            <span>Private local inference</span>
            <span className="text-white/20">/</span>
            <span>Streaming enabled</span>
          </div>

          <label className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 transition hover:border-blue-400/35">
            <Database size={14} className="text-blue-300" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">RAG</span>
            <select
              value={knowledgeBase}
              onChange={(event) => setKnowledgeBase(event.target.value)}
              className="max-w-[180px] bg-transparent text-xs font-medium text-white outline-none"
            >
              {knowledgeBases.length === 0 ? (
                <option value="default">default</option>
              ) : (
                knowledgeBases.map((base) => (
                  <option key={base.name} value={base.name} className="bg-[#171311]">
                    {base.name} · {base.chunks} chunks
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8">
              <div className="mx-auto max-w-6xl rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-2 shadow-2xl shadow-black/20">
                <WorkspaceLanding
                  model={model}
                  onAction={() => {}}
                />
              </div>
            </div>
          ) : (
            <ChatWindow messages={messages} loading={loading} />
          )}

          <div className="pointer-events-none absolute bottom-28 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/5 bg-black/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-white/25 backdrop-blur sm:flex">
            <Layers3 size={11} />
            Context: {knowledgeBase}
          </div>

          <ChatInput
  ask={async (prompt, model, files) => {
    await ask(
      messages,
      setMessages,
      saveMessages,
      currentId,
      prompt,
      model,
      files,
      knowledgeBase
    );
  }}
            stop={stop}
            loading={loading}
            model={model}
            knowledgeBase={knowledgeBase}
          />
        </section>
      </main>
    </div>
  );
}
