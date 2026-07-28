type Props = {
  name: string;
  chunks: number;
  onDelete: () => void;
  onIndex: () => void;
};

export default function KnowledgeBaseCard({
  name,
  chunks,
  onDelete,
  onIndex,
}: Props) {
  return (
    <div className="group flex flex-col gap-6 rounded-3xl border border-[#35291F] bg-[#221C18] p-7 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500">

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        <div className="flex items-start gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#171311] text-3xl border border-[#35291F]">
            📚
          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              {name}
            </h2>

            <p className="mt-2 text-gray-400">
              {chunks.toLocaleString()} indexed chunks
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <span className="rounded-full border border-green-700 bg-green-900/20 px-3 py-1 text-xs font-medium text-green-400">
                ✓ Ready
              </span>

              <span className="rounded-full border border-orange-700 bg-orange-900/20 px-3 py-1 text-xs font-medium text-orange-400">
                RAG Enabled
              </span>

            </div>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onIndex}
            className="rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-400"
          >
            Index Project
          </button>

          <button
            onClick={onDelete}
            className="rounded-2xl border border-red-500 bg-red-500/10 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>

        </div>

      </div>

      <div className="h-px bg-[#35291F]" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

        <div className="rounded-2xl border border-[#35291F] bg-[#171311] p-4">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Chunks
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            {chunks.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-[#35291F] bg-[#171311] p-4">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Status
          </p>

          <p className="mt-2 text-lg font-semibold text-green-400">
            Ready
          </p>
        </div>

        <div className="rounded-2xl border border-[#35291F] bg-[#171311] p-4">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Search
          </p>

          <p className="mt-2 text-lg font-semibold text-orange-400">
            Enabled
          </p>
        </div>

        <div className="rounded-2xl border border-[#35291F] bg-[#171311] p-4">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Type
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            Local
          </p>
        </div>

      </div>

    </div>
  );
}