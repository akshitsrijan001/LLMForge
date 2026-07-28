export default function InterfaceCard() {
  return (
    <section className="rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-8 shadow-2xl shadow-black/20">

      <div className="mb-8">

        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-orange-300/70">
          Interface
        </p>

        <h2 className="text-2xl font-bold text-white">
          Interface Configuration
        </h2>

        <p className="mt-2 text-white/45">
          Personalize the LLMForge workspace experience and interaction
          preferences.
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-white/5 bg-[#12100e] p-5 transition hover:border-orange-500/40">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Theme
          </p>

          <h3 className="mt-3 text-xl font-bold text-white">
            Forge Dark
          </h3>

          <p className="mt-2 text-sm text-white/45">
            Optimized for long development and AI sessions.
          </p>

        </div>

        <div className="rounded-2xl border border-white/5 bg-[#12100e] p-5 transition hover:border-orange-500/40">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Streaming
          </p>

          <h3 className="mt-3 text-xl font-bold text-green-400">
            Enabled
          </h3>

          <p className="mt-2 text-sm text-white/45">
            Responses stream token-by-token for faster feedback.
          </p>

        </div>

        <div className="rounded-2xl border border-white/5 bg-[#12100e] p-5 transition hover:border-orange-500/40">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Optimization
          </p>

          <h3 className="mt-3 text-xl font-bold text-orange-400">
            DSPy Ready
          </h3>

          <p className="mt-2 text-sm text-white/45">
            Workspace prepared for future prompt optimization workflows.
          </p>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-orange-500/15 bg-orange-500/5 p-5">

        <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">
          Workspace Status
        </h4>

        <div className="mt-4 grid gap-4 md:grid-cols-4">

          <div>
            <p className="text-xs text-white/40">Inference</p>
            <p className="mt-1 font-semibold text-green-400">
              Local
            </p>
          </div>

          <div>
            <p className="text-xs text-white/40">Provider</p>
            <p className="mt-1 font-semibold text-white">
              Ollama
            </p>
          </div>

          <div>
            <p className="text-xs text-white/40">Knowledge</p>
            <p className="mt-1 font-semibold text-blue-300">
              ChromaDB
            </p>
          </div>

          <div>
            <p className="text-xs text-white/40">Status</p>
            <p className="mt-1 font-semibold text-green-400">
              Ready
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}