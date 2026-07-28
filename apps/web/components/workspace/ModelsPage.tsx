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
    <div className="space-y-8">

      {/* Stats */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6 shadow-xl shadow-black/20">
          <p className="text-sm text-gray-400">Installed Models</p>
          <h2 className="mt-2 text-3xl font-bold text-orange-400">
            {models.length}
          </h2>
        </div>

        <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6 shadow-xl shadow-black/20">
          <p className="text-sm text-gray-400">Inference</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Local
          </h2>
        </div>

        <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-6 shadow-xl shadow-black/20">
          <p className="text-sm text-gray-400">Provider</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Ollama
          </h2>
        </div>

      </div>

      {/* Installed Models */}

      <div className="rounded-3xl border border-[#35291F] bg-[#221C18] p-7 shadow-xl shadow-black/20">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Installed Models
        </h2>

        <div className="grid gap-5">

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

    </div>
  );
}