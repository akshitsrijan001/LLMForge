"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  HardDrive,
  Wifi,
  Zap,
} from "lucide-react";

import {
  Counter,
  PulseDot,
} from "../common/Primitives";

import {
  ProgressRing,
  TelemetryGraph,
} from "./TelemetryGraph";

export function SystemMonitor() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: .15,
        duration: .55,
      }}
      className="rounded-[24px] border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <header className="flex items-center justify-between">

        <div>

          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            System Health
          </div>

          <h3 className="mt-1 text-[18px] font-semibold text-white">
            Forge Telemetry
          </h3>

        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-[#34d399]/30 bg-[#34d399]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#34d399]">

          <PulseDot
            color="#34d399"
            size={6}
          />

          Healthy

        </span>

      </header>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <HealthRing
          value={68}
          color="#ff7a1a"
          label="GPU"
          sub="RTX4090 • 16.4 / 24 GB"
          icon={<Cpu size={14} />}
        />

        <HealthRing
          value={41}
          color="#3e8ef7"
          label="Memory"
          sub="26.2 / 64 GB"
          icon={<HardDrive size={14} />}
        />

        <HealthRing
          value={82}
          color="#34d399"
          label="Throughput"
          sub="128 tok/s"
          icon={<Zap size={14} />}
        />

        <HealthRing
          value={94}
          color="#a76cf2"
          label="Gateway"
          sub="42 ms"
          icon={<Wifi size={14} />}
        />

      </div>

      <div className="mt-6 rounded-2xl border border-white/5 bg-black/20 p-4">

        <div className="flex items-center justify-between">

          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Latency
          </span>

          <span className="text-white">

            <Counter value={128} /> ms

          </span>

        </div>

        <div className="mt-3">

          <TelemetryGraph
            color="#a76cf2"
            width={360}
            height={70}
            isLive
            data={[
              42,
              48,
              50,
              45,
              52,
              60,
              58,
              65,
              72,
              68,
              74,
              82,
              78,
              88,
              95,
              90,
              102,
              118,
              128,
            ]}
          />

        </div>

      </div>

    </motion.section>
  );
}

function HealthRing({
  value,
  color,
  label,
  sub,
  icon,
}: {
  value: number;
  color: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-black/20 p-3">

      <ProgressRing
        value={value}
        color={color}
        label={`${value}%`}
      />

      <div>

        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">

          <span style={{ color }}>
            {icon}
          </span>

          {label}

        </div>

        <div className="mt-1 text-[12px] text-white/70">

          {sub}

        </div>

      </div>

    </div>
  );
}

export default SystemMonitor;