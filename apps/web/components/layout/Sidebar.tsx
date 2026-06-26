"use client";

import {
  Plus,
  Search,
  History,
  Pin,
  BookOpen,
  Bot,
  Database,
  Settings,
  Puzzle,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-[280px] bg-[#171311] border-r border-[#2A211B] flex flex-col justify-between h-screen p-5">

      {/* Top */}
      <div>

        {/* Logo */}
        <h1 className="text-2xl font-bold text-white mb-8">
          🚀 LLMForge
        </h1>

        {/* New Session */}
        <button className="w-full bg-orange-500 hover:bg-orange-400 transition rounded-xl py-3 text-white font-medium flex items-center justify-center gap-2">
          <Plus size={18} />
          New Session
        </button>

        {/* Search */}
        <div className="mt-6">
          <div className="flex items-center bg-[#221c18] rounded-xl px-3 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search sessions..."
              className="ml-2 bg-transparent outline-none text-sm text-white w-full placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Recent */}
        <div className="mt-8">

          <h3 className="text-xs uppercase text-gray-500 mb-3">
            Recent Activity
          </h3>

          <SidebarItem
            icon={<History size={16} />}
            title="UI Design System"
          />

          <SidebarItem
            icon={<History size={16} />}
            title="Python API Integration"
          />

          <SidebarItem
            icon={<History size={16} />}
            title="Data Pipeline"
          />

        </div>

        {/* Pinned */}

        <div className="mt-8">

          <h3 className="text-xs uppercase text-gray-500 mb-3">
            Pinned
          </h3>

          <SidebarItem
            icon={<Pin size={16} />}
            title="Model Training Specs"
          />

        </div>

        {/* Navigation */}

        <div className="mt-8 space-y-2">

          <SidebarItem
            icon={<BookOpen size={18} />}
            title="Knowledge Bases"
          />

          <SidebarItem
            icon={<Bot size={18} />}
            title="Agents"
          />

          <SidebarItem
            icon={<Database size={18} />}
            title="Models"
          />

          <SidebarItem
            icon={<Puzzle size={18} />}
            title="Integrations"
          />

          <SidebarItem
            icon={<Settings size={18} />}
            title="Settings"
          />

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-[#2A211B] pt-4">

        <div className="flex items-center gap-3">

          <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            S
          </div>

          <div>

            <p className="text-white text-sm font-medium">
              Srijan
            </p>

            <p className="text-gray-500 text-xs">
              Local Developer
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}

function SidebarItem({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#2A211B] transition text-gray-300 hover:text-white text-sm">
      {icon}
      {title}
    </button>
  );
}