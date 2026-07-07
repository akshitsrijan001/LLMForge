"use client";

import { useEffect, useState } from "react";
import { getInstalledModels } from "../../services/system.service";
import ModelCard from "./models/ModelCard";
function formatBytes(bytes: number) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
}

export default function ModelsPage() {
  const [models, setModels] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getInstalledModels();
      setModels(data);
    }

    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#0B1020] p-10 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold text-orange-400">
          🤖 Models
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-gray-400">
          Configure local and cloud language models, compare performance and
          manage inference settings for your AI workspace.
        </p>

        <div className="mt-10 grid gap-6">

          {models.map((model) => (
            <ModelCard
              key={model.name}
              name={model.name}
              size={formatBytes(model.size)}
              family={model.details.family}
              parameters={model.details.parameter_size}
              quantization={model.details.quantization_level}
            />
          ))}

        </div>

      </div>
    </main>
  );
}