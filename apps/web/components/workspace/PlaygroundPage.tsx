"use client";

import { useState } from "react";
import {
  sendChat,
  stopGeneration,
} from "../../services/api.service";
import { useEffect } from "react";
import { getKnowledgeBases } from "../../services/knowledgeBase.service";
import { getInstalledModels } from "../../services/system.service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FileText } from "lucide-react";
import { useRef } from "react";

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
const [loading, setLoading] = useState(false);
const [copied, setCopied] = useState(false);
const [responseTime, setResponseTime] = useState<number | null>(null);
const [tokenCount, setTokenCount] = useState(0);

const [model, setModel] = useState("llama3.1:8b");
const [knowledgeBase, setKnowledgeBase] = useState("default");
const [temperature, setTemperature] = useState(0.4);
const [knowledgeBases, setKnowledgeBases] = useState<any[]>([]);
const [models, setModels] = useState<any[]>([]);
const bottomRef = useRef<HTMLDivElement>(null);


async function runPrompt() {
  if (!prompt.trim() || loading) return;

  setResponse("");
  setLoading(true);
  const start = performance.now();

  try {
    await sendChat(
      {
        prompt,
        model,
        history: [],
        files: [],
        knowledge_base: knowledgeBase,
        generation_settings: {
          temperature,
          topP: 0.95,
          context: 4096,
        },
      },
      (chunk: string) => {
    setResponse((prev) => {
        const next = prev + chunk;
        setTokenCount(next.split(/\s+/).length);
        return next;
    });
}
    );
  } finally {
    setResponseTime(
  Number(((performance.now() - start) / 1000).toFixed(2))
);
    setLoading(false);
  }
}

useEffect(() => {
  async function load() {
  const data = await getKnowledgeBases();

  setKnowledgeBases(data);
  const installed = await getInstalledModels();
  setModels(installed);

  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [response]);

if (installed.length > 0) {
    setModel(installed[0].name);
}

  if (data.length > 0) {
    setKnowledgeBase(data[0].name);
  }

  
}

  load();
}, []);

  return (
    <main className="min-h-screen bg-[#0B1020] text-white p-10">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-bold text-orange-400">
          🛝 Playground
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-gray-400">
          Experiment with prompts, tune generation parameters and test your
          local models before deploying them into production.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-8">

          {/* Prompt Area */}

          <div className="col-span-2 rounded-2xl border border-slate-700 bg-[#142338] p-6">

            <h2 className="text-xl font-semibold">
              Prompt
            </h2>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask your model anything..."
              className="mt-5 h-72 w-full resize-none rounded-xl border border-slate-700 bg-[#0B1628] p-5 outline-none"
            />

            <div className="mt-6 flex gap-3">

  <button
    onClick={runPrompt}
    disabled={loading}
    className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:opacity-50"
  >
    {loading ? "Generating..." : "🚀 Run Prompt"}
  </button>

  <button
    onClick={() => stopGeneration()}
    disabled={!loading}
    className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-400 disabled:opacity-40"
  >
    ⛔ Stop
  </button>

</div>

          </div>

          {/* Right Panel */}

          <div className="space-y-6">

            <div className="rounded-2xl border border-slate-700 bg-[#142338] p-6">

              <h3 className="font-semibold">
                Model
              </h3>

              <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="mt-4 w-full rounded-xl border border-slate-700 bg-[#0B1628] p-3"
            >
              {models.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>

            </div>

            <div className="rounded-2xl border border-slate-700 bg-[#142338] p-6">

              <h3 className="font-semibold">
                Knowledge Base
              </h3>

              <select
              value={knowledgeBase}
              onChange={(e) => setKnowledgeBase(e.target.value)}
              className="mt-4 w-full rounded-xl border border-slate-700 bg-[#0B1628] p-3"
            >
              {knowledgeBases.map((kb) => (
                <option key={kb.name} value={kb.name}>
                  {kb.name}
                </option>
              ))}
            </select>

            </div>

            <div className="rounded-2xl border border-slate-700 bg-[#142338] p-6">

              <h3 className="font-semibold">
                Temperature
              </h3>

              <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="mt-5 w-full accent-orange-500"
                />

            </div>

          </div>

        </div>

        {/* Response */}

        <div className="mt-10 rounded-2xl border border-slate-700 bg-[#142338] p-6">

          <h2 className="text-xl font-semibold">
            Response
          </h2>

          <div className="mt-4 flex justify-end">
  <button
    onClick={async () => {
      await navigator.clipboard.writeText(response);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }}
    className="rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
  >
    {copied ? "✅ Copied" : "📋 Copy"}
  </button>
</div>
<div className="mb-4 flex flex-wrap gap-3 text-sm">

  <span className="rounded-lg bg-slate-800 px-3 py-2">
    🤖 {model}
  </span>

  <span className="rounded-lg bg-slate-800 px-3 py-2">
    📚 {knowledgeBase}
  </span>

  <span className="rounded-lg bg-slate-800 px-3 py-2">
    ⚡ {responseTime ?? "--"} s
  </span>

  <span className="rounded-lg bg-slate-800 px-3 py-2">
    🔢 {tokenCount} tokens
  </span>

</div>

          <div className="mt-5 min-h-[300px] rounded-xl border border-slate-700 bg-[#0B1628] p-5 text-gray-400">

            <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          className="rounded bg-slate-800 px-1 py-0.5 text-orange-300"
          {...props}
        >
          {children}
        </code>
      );
    },
  }}
>
  {response
  .replace(/Sources:[\s\S]*/i, "")
  || "Your model response will appear here."}
</ReactMarkdown>
<div ref={bottomRef} />
{response.includes("Sources:") && (
  <div className="mt-8 border-t border-slate-700 pt-6">

    <h3 className="mb-4 text-lg font-semibold text-white">
      Sources
    </h3>

    <div className="space-y-3">

      {response
        .split("Sources:")[1]
        ?.trim()
        .split("\n")
        .filter((line) => line.trim())
        .map((line, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
          >
            <FileText className="h-5 w-5 text-orange-400" />

            <div className="flex-1">

              <p className="text-sm text-white">
                {line.replace(/^-/, "").trim()}
              </p>

            </div>

          </div>
        ))}

    </div>

  </div>
)}
          </div>

        </div>

      </div>

    </main>
  );
}