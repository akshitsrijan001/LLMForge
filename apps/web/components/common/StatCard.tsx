import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: { value: string; positive?: boolean };
  helper?: string;
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  color = "#fb923c",
  trend,
  helper,
}: StatCardProps) {
  const positive = trend?.positive ?? true;
  const TrendIcon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <article className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">{label}</span>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10"
          style={{ color, backgroundColor: `${color}16` }}
        >
          <Icon size={17} />
        </span>
      </div>
      <div className="mt-5 text-3xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        {trend && (
          <span className={positive ? "inline-flex items-center text-emerald-300" : "inline-flex items-center text-rose-300"}>
            <TrendIcon size={14} />
            {trend.value}
          </span>
        )}
        {helper && <span className="text-white/40">{helper}</span>}
      </div>
    </article>
  );
}
