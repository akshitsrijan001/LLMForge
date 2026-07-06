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
    <div className="rounded-xl border border-slate-700 bg-[#142338] p-6 flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold">
          📁 {name}
        </h3>

        <p className="text-gray-400 mt-2">
          {chunks} indexed chunks
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onIndex}
          className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold text-black"
        >
          Index Project
        </button>

        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}