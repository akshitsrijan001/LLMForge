"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SidebarSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-7">
      <div
        className="
          flex
          items-center
          rounded-2xl
          border
          border-[#2A211B]
          bg-[#221C18]
          px-4
          py-3
          transition-all
          duration-300
          hover:border-orange-500/60
          focus-within:border-orange-500
          focus-within:shadow-lg
          focus-within:shadow-orange-500/10
        "
      >
        <Search
          size={18}
          className="text-gray-400"
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search sessions..."
          className="
            ml-3
            w-full
            bg-transparent
            text-white
            outline-none
            placeholder:text-gray-500
          "
        />
      </div>
    </div>
  );
}