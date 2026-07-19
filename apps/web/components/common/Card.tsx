"use client";

import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-700/70
        bg-[#142338]/95
        backdrop-blur-md
        shadow-lg
        transition-all
        duration-300
        ${
          hover
            ? "hover:-translate-y-1 hover:border-orange-500/70 hover:shadow-orange-500/20 hover:shadow-2xl"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}