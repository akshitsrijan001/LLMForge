export default function InferenceCard() {
  return (
    <section className="rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-8 shadow-2xl shadow-black/20">

      <div className="mb-8">

        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-orange-300/70">
          Inference
        </p>

        <h2 className="text-2xl font-bold text-white">
          Inference Defaults
        </h2>

        <p className="mt-2 text-white/45">
          Configure the default generation parameters used throughout
          LLMForge.
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-white/5 bg-[#12100e] p-5">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Temperature
          </p>

          <h3 className="mt-3 text-3xl font-bold text-orange-400">
            0.4
          </h3>

          <p className="mt-2 text-sm text-white/45">
            Lower values produce more deterministic responses.
          </p>

        </div>

        <div className="rounded-2xl border border-white/5 bg-[#12100e] p-5">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Context Window
          </p>

          <h3 className="mt-3 text-3xl font-bold text-white">
            4096
          </h3>

          <p className="mt-2 text-sm text-white/45">
            Maximum number of context tokens used during inference.
          </p>

        </div>

        <div className="rounded-2xl border border-white/5 bg-[#12100e] p-5">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Top P
          </p>

          <h3 className="mt-3 text-3xl font-bold text-blue-400">
            0.95
          </h3>

          <p className="mt-2 text-sm text-white/45">
            Controls nucleus sampling for balanced text generation.
          </p>

        </div>

      </div>

    </section>
  );
}