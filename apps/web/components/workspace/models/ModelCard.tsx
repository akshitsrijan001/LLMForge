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
}: Props) {
  const copyName = async () => {
    await navigator.clipboard.writeText(name);
  };

  return (
    <div className="group rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-7 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

        <div>

          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-orange-300/70">
            Installed Model
          </p>

          <h2 className="text-2xl font-bold text-white">
            {name}
          </h2>

          <p className="mt-2 text-white/45">
            {family}
          </p>

        </div>

        <div className="flex items-center gap-3">

          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Installed
          </span>

          <span className="rounded-xl border border-white/10 bg-[#12100e] px-4 py-2 font-semibold text-orange-300">
            {size}
          </span>

        </div>

      </div>

      <div className="my-8 h-px bg-white/[0.06]" />

      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-2xl border border-white/5 bg-[#12100e] p-5">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Parameters
          </p>

          <p className="mt-3 text-lg font-semibold text-white">
            {parameters}
          </p>

        </div>

        <div className="rounded-2xl border border-white/5 bg-[#12100e] p-5">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Quantization
          </p>

          <p className="mt-3 text-lg font-semibold text-white">
            {quantization}
          </p>

        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <button className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-black transition hover:bg-orange-400">
          View Details
        </button>

        <button
          onClick={copyName}
          className="rounded-xl border border-white/10 bg-[#171311] px-5 py-2.5 font-medium text-white transition hover:border-orange-500 hover:bg-[#221C18]"
        >
          Copy Name
        </button>

      </div>

    </div>
  );
}