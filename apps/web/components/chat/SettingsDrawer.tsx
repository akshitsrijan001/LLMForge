"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SettingsDrawer({
  open,
  onClose,
}: Props) {

  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [systemPrompt, setSystemPrompt] = useState("");

  useEffect(() => {
    const settings = localStorage.getItem("forge-settings");

    if (settings) {
      const s = JSON.parse(settings);

      setTemperature(s.temperature ?? 0.7);
      setTopP(s.topP ?? 0.9);
      setMaxTokens(s.maxTokens ?? 2048);
      setSystemPrompt(s.systemPrompt ?? "");
    }
  }, []);

  const save = () => {
    localStorage.setItem(
      "forge-settings",
      JSON.stringify({
        temperature,
        topP,
        maxTokens,
        systemPrompt,
      })
    );

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60">

      <div className="absolute right-0 top-0 h-full w-[420px] border-l border-[#2A211B] bg-[#171311] p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            AI Settings
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <SettingSlider
          title="Temperature"
          value={temperature}
          min={0}
          max={2}
          step={0.1}
          onChange={setTemperature}
        />

        <SettingSlider
          title="Top P"
          value={topP}
          min={0}
          max={1}
          step={0.05}
          onChange={setTopP}
        />

        <div className="mt-8">

          <label className="mb-2 block text-sm">
            Max Tokens
          </label>

          <input
            type="number"
            value={maxTokens}
            onChange={(e) =>
              setMaxTokens(Number(e.target.value))
            }
            className="w-full rounded-lg border border-[#35291F] bg-[#1B1715] p-3"
          />

        </div>

        <div className="mt-8">

          <label className="mb-2 block text-sm">
            System Prompt
          </label>

          <textarea
            rows={6}
            value={systemPrompt}
            onChange={(e)=>setSystemPrompt(e.target.value)}
            className="w-full rounded-lg border border-[#35291F] bg-[#1B1715] p-3"
          />

        </div>

        <button
          onClick={save}
          className="mt-8 w-full rounded-xl bg-orange-500 py-3 font-semibold"
        >
          Save Settings
        </button>

      </div>

    </div>
  );
}

function SettingSlider({
  title,
  value,
  min,
  max,
  step,
  onChange,
}: any) {

  return (

    <div className="mt-6">

      <div className="mb-2 flex justify-between">

        <span>{title}</span>

        <span>{value}</span>

      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e)=>onChange(Number(e.target.value))}
        className="w-full"
      />

    </div>

  );

}