type Props = {
  name: string;
  size: string;
  family: string;
  parameters: string;
  quantization: string;
};

export default function ModelCard({
  name,
  size,
  family,
  parameters,
  quantization,
}: Props) 
{const copyName = async () => {
  await navigator.clipboard.writeText(name);
};
  return (
  <div className="rounded-2xl border border-slate-700 bg-[#142338] p-6 transition hover:border-orange-500">

    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-xl font-bold text-white">
          {name}
        </h2>

        <p className="mt-2 text-gray-400">
          {family}
        </p>
      </div>

      <div className="flex items-center gap-3">

        <span className="rounded-full bg-green-900 px-3 py-1 text-sm text-green-300">
          Installed
        </span>

        <span className="rounded-lg bg-[#0B1628] px-4 py-2 font-semibold text-orange-400">
          {size}
        </span>

      </div>

    </div>

    <div className="mt-8 grid grid-cols-2 gap-6">

      <div>

        <p className="text-sm text-gray-500">
          Parameters
        </p>

        <p className="mt-1 text-white">
          {parameters}
        </p>

      </div>

      <div>

        <p className="text-sm text-gray-500">
          Quantization
        </p>

        <p className="mt-1 text-white">
          {quantization}
        </p>

      </div>

    </div>

    <div className="mt-8 flex gap-3">

      <button className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-black hover:bg-orange-400">
        Details
      </button>

      <button
  onClick={copyName}
  className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600"
>
  Copy Name
</button>

    </div>

  </div>
);}