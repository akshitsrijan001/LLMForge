"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  Code2,
  Gauge,
  Sparkles,
} from "lucide-react";

type ModelSelectorProps = {
  value: string;
  onChange: (value: string) => void;
  models?: string[];
};

type ModelMeta = {
  label: string;
  description: string;
  icon: typeof Sparkles;
  accent: string;
};

const knownModels: Record<string, ModelMeta> = {
  auto: {
    label: "Forge Auto",
    description: "Routes each request to the best local model.",
    icon: Sparkles,
    accent: "#fb923c",
  },
  "llama3.1:8b": {
    label: "Llama 3.1 8B",
    description: "Balanced reasoning and everyday work.",
    icon: BrainCircuit,
    accent: "#a78bfa",
  },
  "qwen2.5-coder:3b": {
    label: "Qwen Coder",
    description: "Fast, focused code generation.",
    icon: Code2,
    accent: "#60a5fa",
  },
  "gemma3:1b": {
    label: "Gemma 3",
    description: "Lightweight answers with low latency.",
    icon: Gauge,
    accent: "#34d399",
  },
  "phi3:mini": {
    label: "Phi 3 Mini",
    description: "Compact model for quick exploration.",
    icon: Bot,
    accent: "#f472b6",
  },
};

function metaFor(model: string): ModelMeta {
  return (
    knownModels[model] ?? {
      label: model,
      description: "Installed locally through Ollama.",
      icon: Bot,
      accent: "#22d3ee",
    }
  );
}

export default function ModelSelector({
  value,
  onChange,
  models = [],
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const options = useMemo(
    () => Array.from(new Set(["auto", ...models])),
    [models]
  );
  const selected = metaFor(value);
  const SelectedIcon = selected.icon;

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className="group flex min-w-[210px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-left transition hover:border-orange-400/45 hover:bg-white/[0.075]"
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10"
          style={{ color: selected.accent, backgroundColor: `${selected.accent}18` }}
        >
          <SelectedIcon size={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12px] font-semibold text-white">
            {selected.label}
          </span>
          <span className="block truncate font-mono text-[9px] uppercase tracking-wider text-white/40">
            {value === "auto" ? "Smart routing" : "Local model"}
          </span>
        </span>
        <ChevronDown
          size={15}
          className={`text-white/45 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-[330px] overflow-hidden rounded-2xl border border-white/10 bg-[#151311]/98 p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl"
        >
          <div className="px-3 pb-2 pt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
            Inference engine
          </div>
          <div className="space-y-1">
            {options.map((model) => {
              const meta = metaFor(model);
              const Icon = meta.icon;
              const isSelected = model === value;
              return (
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  key={model}
                  onClick={() => {
                    onChange(model);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    isSelected ? "bg-orange-500/12" : "hover:bg-white/[0.055]"
                  }`}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10"
                    style={{ color: meta.accent, backgroundColor: `${meta.accent}16` }}
                  >
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-white">
                      {meta.label}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-white/45">
                      {meta.description}
                    </span>
                  </span>
                  {isSelected && <Check size={16} className="shrink-0 text-orange-400" />}
                </button>
              );
            })}
          </div>
          {models.length === 0 && (
            <p className="mx-2 mb-1 mt-2 rounded-xl border border-dashed border-white/10 px-3 py-2 text-[11px] leading-5 text-white/40">
              Connect Ollama to see every installed model here.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
