"use client";

import { motion } from "framer-motion";
import { useId, useMemo } from "react";

type Props = {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  isLive?: boolean;
  fill?: boolean;
};

export function TelemetryGraph({
  data,
  color = "#ff7a1a",
  width = 640,
  height = 90,
  isLive = true,
  fill = true,
}: Props) {
  const { path, area, lastX, lastY } = useMemo(() => {
    if (!data.length)
      return {
        path: "",
        area: "",
        lastX: 0,
        lastY: 0,
      };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const step = width / (data.length - 1);

    const pts = data.map((v, i) => {
      const x = i * step;

      const y =
        height -
        ((v - min) / range) * (height - 8) -
        4;

      return [x, y] as const;
    });

    const path = pts
      .map(([x, y], i) =>
        i === 0
          ? `M ${x} ${y}`
          : `L ${x} ${y}`
      )
      .join(" ");

    const area =
      `${path}
       L ${width} ${height}
       L 0 ${height}
       Z`;

    return {
      path,
      area,
      lastX: pts.at(-1)?.[0] ?? 0,
      lastY: pts.at(-1)?.[1] ?? 0,
    };
  }, [data, width, height]);

  const gradientId = useId().replace(/:/g, "");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full overflow-visible"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor={color}
            stopOpacity=".32"
          />

          <stop
            offset="100%"
            stopColor={color}
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {fill && (
        <motion.path
          d={area}
          fill={`url(#${gradientId})`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: isLive
              ? [0.8, 1, 0.8]
              : 1,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      )}

      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          duration: 1,
        }}
      />

      <motion.circle
        cx={lastX}
        cy={lastY}
        r={3}
        fill={color}
        animate={{
          r: [3, 4.5, 3],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      />

      {isLive && (
        <motion.circle
          cx={lastX}
          cy={lastY}
          r={6}
          fill="none"
          stroke={color}
          strokeOpacity={0.5}
          animate={{
            r: [4, 12],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}
    </svg>
  );
}

type RingProps = {
  value: number;
  color?: string;
  size?: number;
  stroke?: number;
  label?: string;
};

export function ProgressRing({
  value,
  color = "#ff7a1a",
  size = 72,
  stroke = 6,
  label,
}: RingProps) {
  const radius = (size - stroke) / 2;

  const circumference =
    radius * Math.PI * 2;

  const offset =
    circumference -
    (value / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,.08)"
          strokeWidth={stroke}
        />

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset:
              circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: .8,
          }}
        />
      </svg>

      {label && (
        <span className="absolute text-[13px] font-semibold text-white">
          {label}
        </span>
      )}
    </div>
  );
}

export default TelemetryGraph;