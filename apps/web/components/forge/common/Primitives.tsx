"use client";

import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export function PulseDot({
  color = "#34d399",
  size = 8,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <span
      className="relative inline-flex"
      style={{ width: size, height: size }}
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: color }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: color }}
        animate={{
          scale: [1, 2.2],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </span>
  );
}

export function Counter({
  value,
  format = "int",
}: {
  value: number;
  format?: "int" | "compact" | "float1";
}) {
  let text: string;

  if (format === "compact") {
    text = Intl.NumberFormat("en", {
      notation: "compact",
    }).format(value);
  } else if (format === "float1") {
    text = value.toFixed(1);
  } else {
    text = new Intl.NumberFormat("en-IN").format(value);
  }

  return <span>{text}</span>;
}



export function StatusPill({
  color = "#34d399",
  label,
}: {
  color?: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/70 backdrop-blur">
      <PulseDot color={color} size={6} />
      {label}
    </span>
  );
}