"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}