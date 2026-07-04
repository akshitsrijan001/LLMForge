export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#081425] border-r border-[#22314A] px-7 py-8">

      <h1 className="text-3xl font-bold text-orange-400">
        LLMForge
      </h1>

      <nav className="mt-16 space-y-5">

        <button className="w-full rounded-xl px-5 py-4 text-left text-lg text-gray-300 hover:bg-[#18263D] transition">
          Workspace
        </button>

        <button className="w-full rounded-xl px-5 py-4 text-left text-lg bg-[#18263D] border-l-4 border-orange-400 text-orange-400 font-semibold">
          Provider Settings
        </button>

        <button className="w-full rounded-xl px-5 py-4 text-left text-lg text-gray-300 hover:bg-[#18263D] transition">
          Parameters
        </button>

        <button className="w-full rounded-xl px-5 py-4 text-left text-lg text-gray-300 hover:bg-[#18263D] transition">
          Security
        </button>

      </nav>

    </aside>
  );
}