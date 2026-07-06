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
    <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-[#142338] p-6 transition-all duration-200 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10">

      <div>

        <div className="flex items-center gap-3">

          <span className="text-2xl">
            📁
          </span>

          <div>

            <h3 className="text-xl font-semibold text-white">
              {name}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {chunks.toLocaleString()} indexed chunks
            </p>

          </div>

        </div>

        <div className="mt-4 flex gap-2">

          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
            ✅ Ready
          </span>

          <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400">
            🧠 RAG Enabled
          </span>

        </div>

      </div>

      <div className="flex gap-3">

        <button
          onClick={onIndex}
          className="rounded-xl bg-orange-500 px-5 py-2 font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-orange-400"
        >
          Index Project
        </button>

        <button
          onClick={onDelete}
          className="rounded-xl bg-red-500 px-5 py-2 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-red-400"
        >
          Delete
        </button>

      </div>

    </div>
  );
}